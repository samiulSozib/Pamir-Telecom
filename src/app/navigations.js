// export const navigations = [
//   { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
//   { label: "PAGES", type: "label" },
//   { name: "Product / Packages", path: "/packages/default", icon: "dashboard" },
//   { name: "Transaction", path: "/transaction/default", icon: "dashboard" },
//   { name: "Order", path: "/order/default", icon: "dashboard" },
//   { name: "Sub Reseller", path: "/sub-reseller/default", icon: "dashboard" },
// ];



export const getNavigations=(t)=>{
  return [
  { name: t('DASHBOARD'), path: "/dashboard/default", icon: "dashboard" },
  { label: t('PAGES'), type: "label" },
  { name: t('PRODUCT_PACKAGE'), path: "/packages/default", icon: "dashboard" },
  { name:t('TRANSACTIONS'), path: "/transaction/default", icon: "dashboard" },
  { name: t('ORDERS'), path: "/order/default", icon: "dashboard" },
  { name: t('SUB_RESELLER'), path: "/sub-reseller/default", icon: "dashboard" },
  ]
}
