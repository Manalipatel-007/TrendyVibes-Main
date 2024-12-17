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
        {value: "green", label: "white"},
        {value: "purple", label: "white"},
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
        {value: "159-399", label: "159 To ₹399"},
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
    name : "DISCOUNT RANGE",
    options :[
        {
            value :"10",
            label : "10% And Above",
        },
        {}
    ]
   }
]