export const appTitle = 'kubbo smart logistics';

// export const baseUrl = '/gui';
export const baseUrl = 'http://localhost:8000/gui';

export const productsUrl = baseUrl + '/products';
export const stocksUrl = baseUrl + '/stocks';
export const warehousesUrl = baseUrl + '/warehouses';
export const imagesUrl = baseUrl + '/products/image';

export const productColumns = ['image', 'name', 'sku', 'barcode', 'price', 'enabled', 'actions'];
export const stockColumns = ['name','city','quantity','status','actions'];

export const stockStatus = ['AVAILABLE','DAMAGED','ASSIGNED'];