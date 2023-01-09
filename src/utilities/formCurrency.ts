// Intl.NumberFormat オブジェクトは、言語に依存した数値書式にできる。
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { currency: "JPY", style: "currency" });

// 数値を引数に受け取って、formatして(書式を整えて)返す。
const formatCurrency = (number: number) => {
    return CURRENCY_FORMATTER.format(number)
}

export default formatCurrency