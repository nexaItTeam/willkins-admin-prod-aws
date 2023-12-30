
export class AllMenuItems { 
    
    public allmenuItems =[{
    "text": "Master",
    "icon": "dashboard",
    "allowedRoles":['admin','TEAM-LEAD'],
    "children": [{
      "text": "Property",
      "icon": "category",
      "allowedRoles":['admin','TEAM-LEAD'],
      "routerLink": "/property"
  },
  {
      "text": "Enquiry",
      "icon": "layers",
      "routerLink": "/enquiry"
  },
  
]
},
{
    "text": "Blog",
    "icon": "people",
    "allowedRoles":['admin','BLOG'],
    "routerLink": "/customer/manage"
},
{
    "text": "Supplier",
    "icon": "supervised_user_circle",
    "routerLink": "/footer"
},
{
    "text": "Suit",
    "icon": "inventory_2",
    "children": [{
            "text": "Category",
            "icon": "category",
            "routerLink": "/footer"
        },
        {
            "text": "Sub Category",
            "icon": "layers",
            "routerLink": "/product/sub-category"
        },
        {
            "text": "Product",
            "icon": "all_inbox",
            "routerLink": "/product/manage"
        }
    ]
},
{
    "text": "Expense",
    "icon": "inventory_2",
    "children": [{
            "text": "Category",
            "icon": "category",
            "routerLink": "/product/category"
        },
        {
            "text": "Manage Expense",
            "icon": "layers",
            "routerLink": "/product/sub-category"
        },
        {
            "text": "Statement",
            "icon": "all_inbox",
            "routerLink": "/product/manage"
        }
    ]
},
{
    "text": "Purchases",
    "icon": "receipt",
    "children": [{
            "text": "New Purchases",
            "icon": "local_atm",
            "routerLink": "/purchases/new"
        },
        {
            "text": "Purchases History",
            "icon": "history",
            "routerLink": "/purchases/history"
        }
    ]
},
{
    "text": "Sales",
    "icon": "calculate",
    "children": [{
            "text": "New Sales",
            "icon": "point_of_sale",
            "routerLink": "/sales/add"
        },
        {
            "text": "Sales History",
            "icon": "history",
            "routerLink": "/sales/history"
        }
    ]
},
{
    "text": "Report",
    "icon": "analytics",
    "routerLink": "/reports"
}
]
 }


const items= new AllMenuItems()
export const AllMenuItem= items.allmenuItems