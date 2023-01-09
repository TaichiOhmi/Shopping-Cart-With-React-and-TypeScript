import { useEffect, useState } from "react"

// ジェネリクス
// 引数は, key: string　と　initialValue: タイプ引数orタイプ引数を返す関数
const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
    const [value, setValue] = useState<T>(() => {
        // localStorage: https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

        // value の初期化

        // localStorageから与えられたkeyで保存されている値を取得
        const jsonValue = localStorage.getItem(key)

        // 取得した値がnullでなければ、その値を value　に代入
        if(jsonValue != null) return JSON.parse(jsonValue)

        // 取得した値がnullだった時
        // initialValueを型に応じて　value に代入
        if(typeof initialValue === 'function') {
            return (initialValue as () => T)
        }else{
            return initialValue
        }
    })

    // key, value が変わった時に、localStorageのアイテムをセットし直す。
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    // [value, setValue] の配列を [typeof value, typeof setValue] として返す。
    return [value, setValue] as [typeof value, typeof setValue]
}

export default useLocalStorage