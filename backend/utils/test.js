const products = [
  {
    _id: "101",
    title: "iPhone 16",
    category: "Smartphone",
    price: 799,
    stock: 25,
  },
  {
    _id: "102",
    title: "Samsung Galaxy S25",
    category: "Smartphone",
    price: 899,
    stock: 30,
  },
  {
    _id: "103",
    title: "MacBook Air M4",
    category: "Laptop",
    price: 1099,
    stock: 15,
  },
  {
    _id: "104",
    title: "Dell XPS 13",
    category: "Laptop",
    price: 999,
    stock: 20,
  },
  {
    _id: "105",
    title: "Sony WH-1000XM5",
    category: "Headphones",
    price: 349,
    stock: 40,
  },
  {
    _id: "106",
    title: "AirPods Pro 2",
    category: "Earbuds",
    price: 249,
    stock: 35,
  },
  {
    _id: "107",
    title: "Logitech MX Master 3S",
    category: "Mouse",
    price: 99,
    stock: 50,
  },
  {
    _id: "108",
    title: "Keychron K2",
    category: "Keyboard",
    price: 89,
    stock: 22,
  },
  {
    _id: "109",
    title: "Samsung 27-inch Monitor",
    category: "Monitor",
    price: 279,
    stock: 18,
  },
  {
    _id: "110",
    title: "Apple Watch Series 10",
    category: "Smartwatch",
    price: 399,
    stock: 28,
  },
];

const deletedIndex = [1,2,8]

const remaining = []

products.map((product,index)=>{
  if (!deletedIndex.includes(index)) {
    remaining.push(product)
  }
})

console.log(remaining);