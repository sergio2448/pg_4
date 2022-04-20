import React from 'react'

const featuresnumerbles = ({ onChange, className, feature, numerable }) => {
    
    return (
        <>
            {numerable ?
                <select name={feature} onChange={e => {onChange(e)}} class={className}>
                    <option>{feature}</option>
                    <option>1</option>
                    <option>2</option>
                    <option value={3}>+3</option>
                </select>
                :
                <select name={feature} onChange={onChange} class={className}>
                    <option>{feature}</option>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                }
        </>
    )
}

export default featuresnumerbles