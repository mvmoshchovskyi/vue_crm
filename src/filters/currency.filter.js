export default function currencyFilter(value, currency = "UAH") {
    return new Intl.NumberFormat('uk-UK', {
        style: 'currency',
        currency
    }).format(value)
}