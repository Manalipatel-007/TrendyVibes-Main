export const color = [
    "white",
    "Black",
    "Red",
    "Marun",
    "Being",
    "Pink",
    "Green",
    "Yellow",
];

export const filters = [

   {
     id: "color",
     name : "color",
     options: [
        {value: "white", label: "white"},
        {value: "beige", label: "Beige"},
        {value: "blue", label: "blue"},
        {value: "brown", label: "brown"},
        {value: "green", label: "green"},
        {value: "purple", label: "purple"},
        {value: "yellow", label: "yellow"},
     ],
   },

   {
    id : "size",
    name : "size",
    options:[
        {value : "S", label : "S"},
        {value : "M", label : "M"},
        {value : "L", label : "L"},
    ],
   },

];

export const singleFilter=[
   {
    id:"price",
    name : "price",
    options: [
        {value: "159-399" , label: "159 To ₹399"},
        {value: "399-999", label: "₹399 To ₹999"},
        {value: "159-399", label: "159 To ₹399"},
        {value: "159-399", label: "159 To ₹399"},
        {value: "159-399", label: "159 To ₹399"},
        {value: "159-399", label: "159 To ₹399"},
        {value: "159-399", label: "159 To ₹399"},

    ],
   },

   {
    id : "discount",
    name : "Discount Range",
    options :[
        {
            value :"10",
            label : "10% And Above",
        },
        {value : "20", label: "20% And Above"},
        {value : "30", label: "20% And Above"},
        {value : "40", label: "20% And Above"},
        {value : "50", label: "20% And Above"},
        {value : "60", label: "20% And Above"},
        {value : "70", label: "20% And Above"},
        {value : "80", label: "20% And Above"},
    ],
   },
   {
    id : "stock",
    name : "Availability",
    options: [
        {value : "in_stock", label : "In Stock"},
        {value : "out_of_stock", label : "Out Of Stock"},
     
    ],
   },
]

export const sortOptions =[
    {name : "price: Low to High", query:"price_low", current:false},
    {name : "price: High to Low", query:"price_High", current:false},
];