// @ts-check

const shoppingCart = {
  items: [],
  total: 0,
  isPromo: false,
  addItem(name, price, quantity) {
    for (let i = 0; i < this.items.length; i += 1) {
      if (this.items[i].name === name) {
        this.items[i].quantity += quantity;
        this.calculateTotal();
        return;
      }
    }

    this.items.push({ name, price, quantity });
    this.calculateTotal();
  },
  removeItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
    this.calculateTotal();
  },
  updateQuantity(name, quantity) {
    this.items = this.items.map((item) => {
      const newItem = { ...item };
      if (newItem.name === name) {
        newItem.quantity = quantity;
      }
      return newItem;
    });
    this.calculateTotal();
  },
  calculateTotal() {
    this.total = 0;
    for (let i = 0; i < this.items.length; i += 1) {
      this.total += this.items[i].price * this.items[i].quantity;
    }
    if (this.isPromo) {
      this.total -= this.total * 0.1;
    }
  },
  clearCart() {
    this.items = [];
    this.total = 0;
    this.isPromo = false;
  },
  applyDiscount(promocode) {
    this.isPromo = promocode === 'HEXLET';
    this.calculateTotal();
  },
};

export default shoppingCart;
