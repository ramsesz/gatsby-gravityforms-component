import classnames from 'classnames'
import get from 'lodash/get'
import React from 'react'

import { fieldByType } from '../../utils/fieldByType'
import { islabelHidden } from '../../utils/inputSettings'

const FieldBuilder = ({
    formData,
    customComponents = {},
    presetValues = {},
    register,
    errors,
}) => {
    // The top level settings for the whole form
    const formSettings = {
        descriptionPlacement: formData.descriptionPlacement,
    }

    let i = 0
    // Loop through fields and create
    const sections = formData.formFields.reduce((previous, field) => {
        console.log('fFFField')
        // Set the wrapper classes
        const inputWrapperClass = classnames(
            `gravityform__field`,
            `gravityform__field__` + field.type,
            `gravityform__field--` + field.size,
            field.cssClass,
            { 'field-required': field.isRequired },
            { 'hidden-label': islabelHidden(field.labelPlacement) }
        )

        const errorKey = ``

        const FieldComponent =
            customComponents[field.type] ||
            fieldByType(
                field,
                inputWrapperClass,
                formSettings,
                errorKey,
                errors,
                register,
                presetValues,
                customComponents
            )

        const result = {
            ...previous,
            [`section-` + i]: {
                properties: field.type === `section` && field,
                fields: get(previous, `section-` + i)
                    ? [...get(previous, `section-` + i).fields, FieldComponent]
                    : [FieldComponent],
            },
        }
        console.log(result)
        if (field.type === `section`) {
            i++
        }
        return result
    }, {})

    return Object.keys(sections).map(sectionKey => {
        const section = sections[sectionKey]
        return (
            <div
                className={`form-field-group ${sectionKey}`}
                key={`section-` + section.properties.label}
            >
                {section.properties && (
                    <div>
                        <h3>{section.properties.label}</h3>
                    </div>
                )}
                <div>{section.fields}</div>
            </div>
        )
    })
}

export default FieldBuilder
