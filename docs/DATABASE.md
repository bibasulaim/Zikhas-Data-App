# Database Schema Documentation

## MongoDB Collections

### Users Collection
```
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  phoneNumber: String,
  password: String (hashed),
  role: String (user, admin),
  walletBalance: Number,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Transactions Collection
```
{
  _id: ObjectId,
  userId: ObjectId,
  type: String (purchase, topup, refund),
  amount: Number,
  status: String (pending, completed, failed),
  reference: String,
  description: String,
  paymentMethod: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Data Bundles Collection
```
{
  _id: ObjectId,
  name: String,
  provider: String,
  dataSize: String,
  price: Number,
  validity: Number (days),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Wallet History Collection
```
{
  _id: ObjectId,
  userId: ObjectId,
  action: String (credit, debit),
  amount: Number,
  balanceBefore: Number,
  balanceAfter: Number,
  reason: String,
  createdAt: Date
}
```

## Indexes

- Users: email (unique), phoneNumber
- Transactions: userId, createdAt
- Wallet History: userId, createdAt

