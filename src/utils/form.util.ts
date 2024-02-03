import { ObjectKeyDynamicI } from "@interfaces/common/common.interface";

export const getValueTypeOfInput = (target: any) => {
    const values: { [key: string]: any } = {
        checkbox: target.checked
    }

    return Object.keys(values).includes(target.type) ? values[target.type] : target.value;
}

export const assignValueToObject = (text: string, value: any, _data: object) => {
    let keys = text.split(".");
    keys.shift();

    let len = keys.length - 1;

    return keys.reduce((a, b, i) => {
        a += `{"${b}"${i > (len - 1) ? `:${value}` : ""}${i == len ? "}".repeat(len + 1) : ""}${i < len ? ":" : ""}`
        return a;
    }, "")
}

export const inputFormToJSON = (target: HTMLFormElement): { data: any, clear: () => void} => {
    const items = [...Array.from(target.querySelectorAll("input")), ...Array.from(target.querySelectorAll("textarea"))]
    return {
        data: items.reduce((a: ObjectKeyDynamicI, b) => {
            let name = b.name;
            let names = name.split("."); 
            let value = getValueTypeOfInput(b);
            if (names.length > 1) {
                a[names[0]] = {
                    ...(a[names[0]]),
                    ...(name.indexOf(".") !== -1 ? JSON.parse(assignValueToObject(name, value, a[names[0]])) : value)
                }
            } else if (name) {
                a[name] = value;
            }
    
    
            return a;
        }, {}),
        clear() {
            items.forEach(item => {
                item.value = ""
            })
        },
    }
}
