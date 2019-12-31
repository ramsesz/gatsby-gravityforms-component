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
        const fieldComponent = Custom
            ? Custom
            : fieldByType(
                  field,
                  inputWrapperClass,
                  formSettings,
                  errorKey,
                  errors,
                  register,
                  presetValues
              )

        const fieldH = () => (
            <fieldComponent
                {...{
                    field,
                    inputWrapperClass,
                    formSettings,
                    errorKey,
                    register,
                    presetValues,
                }}
                key={field.id}
            />
        )
<<<<<<< HEAD
=======
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
>>>>>>> 96391eccae4a00af70c4a3ce3d35293985d5c28e

        const result = {
            ...previous,
            [`section-` + i]: {
<<<<<<< HEAD
                properties: field.type === `section` && field,
                fields: {
                    [field.id]: {
                        ...[`section-` + i][field.id],
                        ...field,
                        component: newField
                    },

                }
                // get(previous, `section-` + i)
                //     ? [...get(previous, `section-` + i).fields, newField]
                //     : [newField],
                // fields: get(previous, `section-` + i)
                //     ? [...get(previous, `section-` + i).fields, newField]
                //     : [newField],
=======
                properties: field,
                fields: get(previous, `section-` + i)
                    ? [...get(previous, `section-` + i).fields, fieldH]
                    : [fieldH],
>>>>>>> 96391eccae4a00af70c4a3ce3d35293985d5c28e
            },
        }

        log(result)
        if (field.type === `section`) {
            i++
        }
        return result
    }, {})
    log(sections)
    return Object.keys(sections).map(sectionKey => {
        const section = sections[sectionKey]
        return (
            <div
                className={`form-field-group ${sectionKey}`}
                key={`section-` + section.properties.id}
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
