import classnames from 'classnames'
import debug from 'debug'
import get from 'lodash/get'
import React from 'react'

import { fieldByType } from '../../utils/fieldByType'
import { islabelHidden } from '../../utils/inputSettings'

const log = debug('topco:gatsby-gravityform')

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
        // Set the wrapper classes
        const inputWrapperClass = classnames(
            `gravityform__field`,
            `gravityform__field__` + field.type,
            `gravityform__field--` + field.size,
            field.cssClass,
            {
                'field-required': field.isRequired,
            },
            {
                'hidden-label': islabelHidden(field.labelPlacement),
            }
        )

        log(`inputs: `, field.inputs)
        log(field.id)
        const errorKey = ``

        const Custom = customComponents[field.type]
        log(`custom:`, Custom)
        const fieldComponent = customComponents[field.type] ? (
            <Custom
                {...{
                    field,
                    inputWrapperClass,
                    formSettings,
                    errorKey,
                    register,
                    presetValues,
                }}
            />
        ) : (
            fieldByType(
                field,
                inputWrapperClass,
                formSettings,
                errorKey,
                errors,
                register,
                presetValues
            )
        )

        // const newField = (
        //     <FieldComponent
        //         // {...{
        //         //     field,
        //         //     inputWrapperClass,
        //         //     formSettings,
        //         //     errorKey,
        //         //     errors,
        //         //     register,
        //         //     presetValues,
        //         //     customComponents,
        //         // }}
        //         key={field.id}
        //     />
        // )

        const result = {
            ...previous,
            [`section-` + i]: {
                properties: field,
                fields: get(previous, `section-` + i)
                    ? [...get(previous, `section-` + i).fields, fieldComponent]
                    : [fieldComponent],
            },
        }

        console.log(result)
        if (field.type === `section`) {
            i++
        }
        return result
    }, {})
    console.log(sections)
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
