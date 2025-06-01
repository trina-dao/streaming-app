export const spec = {
    data: {
        stream: true,
        test: {
            values: [
                { index: 0, price: 190 },
                { index: 1, price: 195 }
            ]
        }
    },
    tone: { 
        continued: true
    },
    encoding : { 
        time: {
            field: 'index',
            type: 'quantitative',
            scale: {
                times: 0.5
            }
        },
        pitch: {
            field: 'price',
            type: 'quantitative',
            scale: {
                domain: [-50, 50]
            }
        }
    },
    notify: null
};