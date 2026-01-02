export const formatToRupiah = (value) => {
    const convertToIdr = value * 15000

    return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(convertToIdr);
}