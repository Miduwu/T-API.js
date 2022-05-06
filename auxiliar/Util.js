module.exports = {
    /**
     * 
     * @param {!Object} params The JSON object of parameters 
     * @returns {string} Query parameters
     */
    getParams: (params) => {
        if(!params) return ''
        let pm = new URLSearchParams('')
        let keys = Object.keys(params)
        for(const key of keys) {
            pm.set(key, params[key])
        }
        return `?${pm.toString()}`
    }
}