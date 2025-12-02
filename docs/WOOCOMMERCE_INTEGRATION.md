# WooCommerce Integration Guide

## Overview

This document describes the WooCommerce REST API integration for equipment rental management. The integration enables automatic synchronization of products and orders between the frontend and WordPress/WooCommerce backend.

## Configuration

### Environment Variables

Add the following to your `.env` file:

```env
VITE_WC_API_URL=https://cms.owh.md/wp-json/wc/v3
VITE_WC_CONSUMER_KEY=your_consumer_key
VITE_WC_CONSUMER_SECRET=your_consumer_secret
```

### WordPress Setup

1. **Install WooCommerce** on your WordPress site
2. **Enable REST API** in WooCommerce settings
3. **Generate API Keys**:
   - Go to WooCommerce → Settings → Advanced → REST API
   - Click "Add key"
   - Set permissions to "Read/Write"
   - Copy the Consumer Key and Consumer Secret

### Product Setup for Rental Equipment

Create products in WooCommerce with these custom fields (via ACF):

- `daily_rate` - Daily rental price in EUR
- `is_available` - Boolean for availability status
- `specifications` - JSON object with equipment specs

## Architecture

```
src/
├── config/
│   └── woocommerce.ts      # API configuration
├── types/
│   └── woocommerce.ts      # TypeScript types
├── lib/api/
│   └── woocommerce-client.ts  # HTTP client
└── hooks/woocommerce/
    ├── index.ts            # Exports
    ├── useWCProducts.ts    # Product hooks
    ├── useWCOrders.ts      # Order hooks
    └── useSubmitRentalOrder.ts  # Rental order submission
```

## Usage

### Fetching Products

```tsx
import { useWCProducts, useWCProductsByCategory } from '@/hooks/woocommerce';

// Fetch all products
const { data: products, isLoading } = useWCProducts();

// Fetch by category
const { data: cameras } = useWCProductsByCategory(1);

// Fetch rental equipment (in stock only)
const { data: available } = useRentalEquipment();
```

### Managing Orders

```tsx
import { useCreateWCOrder, useWCOrders } from '@/hooks/woocommerce';

// Create order
const createOrder = useCreateWCOrder();
await createOrder.mutateAsync({
  billing: { ... },
  line_items: [{ product_id: 123, quantity: 1 }]
});

// Fetch orders
const { data: orders } = useWCOrders({ status: 'processing' });
```

### Submitting Rental Cart

```tsx
import { useSubmitRentalOrder } from '@/hooks/woocommerce';

const submitOrder = useSubmitRentalOrder();

const handleSubmit = async (customerInfo) => {
  await submitOrder.mutateAsync({
    firstName: 'Ion',
    lastName: 'Popescu',
    email: 'ion@example.com',
    phone: '+37379123456',
    message: 'Vreau să ridic echipamentul dimineața'
  });
};
```

## Workflow

### Rental Order Flow

1. **User browses equipment** - Products fetched from WooCommerce
2. **User adds to cart** - Stored locally via Zustand
3. **User submits order** - Order created in WooCommerce with:
   - Line items (products + quantities)
   - Rental dates stored as meta_data
   - Customer contact information
   - Order type marked as "rental"
4. **Admin receives order** - Visible in WooCommerce dashboard
5. **Admin processes** - Updates order status
6. **User notified** - Via email (WooCommerce emails)

### Order Statuses

| Status | Romanian | Description |
|--------|----------|-------------|
| pending | În așteptare | Order received, awaiting confirmation |
| processing | În procesare | Order confirmed, preparing equipment |
| on-hold | În așteptare plată | Awaiting deposit/payment |
| completed | Finalizată | Equipment returned, order closed |
| cancelled | Anulată | Order cancelled |

## Security

- API keys stored as environment variables
- OAuth 1.0a authentication for all requests
- HTTPS required for production
- Rate limiting handled by retry logic

## Caching Strategy

- Products: 5 minutes stale time
- Rental availability: 2.5 minutes (more frequent)
- Orders: 5 minutes stale time
- React Query handles automatic revalidation

## Error Handling

All API calls include:
- Automatic retry (3 attempts)
- Exponential backoff
- Timeout handling (15 seconds)
- User-friendly error messages via toast

## Testing

Test endpoints:
```bash
# Test products endpoint
curl "https://cms.owh.md/wp-json/wc/v3/products?consumer_key=KEY&consumer_secret=SECRET"

# Test orders endpoint
curl "https://cms.owh.md/wp-json/wc/v3/orders?consumer_key=KEY&consumer_secret=SECRET"
```
