import get from 'lodash/get'
import React from 'react'
import Checkbox from '../components/Checkbox'
import Html from '../components/Html'
import Input from '../components/Input'
import Multiselect from '../components/Multiselect'
import Radio from '../components/Radio'
import Select from '../components/Select'
import Textarea from '../components/Textarea'
import { filteredKeys } from '../utils/helpers'
import { getPlacement, ifDefaultValue } from './inputSettings'

export const fieldByType = (
    field,
    inputWrapperClass,
    errorKey,
    formSettings,
    errors,
    register,
    presetValues
) => {
    switch (field.type) {
        // Add note for unsupported captcha field
        case `captcha`:
            return (
                <p>
                    <strong>
                        Gatsby Gravity Form Component currently does not support
                        the CAPTCHA field. Form will not submit with this field
                        present. Remove this field from the Gravity Form.
                    </strong>
                </p>
            )
        // Start with the standard fields
        case `text`:
        case `email`:
        case `phone`:
        case `name`:
        case `address`:
            return (
                <Input
                    className={field.cssClass}
                    description={field.description}
                    descriptionPlacement={getPlacement(
                        formSettings.descriptionPlacement,
                        field.descriptionPlacement
                    )}
                    errors={errors[`input_${field.id}`]}
                    inputMaskValue={field.inputMaskValue}
                    key={field.id}
                    label={field.label}
                    maxLength={field.maxLength || null}
                    name={`input_${field.id}`}
                    placeholder={field.placeholder}
                    register={register}
                    required={field.isRequired}
                    type={field.type}
                    value={
                        get(presetValues, `input_${field.id}`, false)
                            ? get(presetValues, `input_${field.id}`, false)
                            : ifDefaultValue(field)
                    }
                    wrapClassName={inputWrapperClass}
                />
            )
        case `textarea`:
            return (
                <Textarea
                    className={field.cssClass}
                    description={field.description}
                    descriptionPlacement={getPlacement(
                        formSettings.descriptionPlacement,
                        field.descriptionPlacement
                    )}
                    errors={errors[`input_${field.id}`]}
                    inputMaskValue={field.inputMaskValue}
                    key={field.id}
                    label={field.label}
                    maxLength={field.maxLength || null}
                    name={`input_${field.id}`}
                    placeholder={field.placeholder}
                    register={register}
                    required={field.isRequired}
                    type={field.type}
                    value={
                        get(presetValues, `input_${field.id}`, false)
                            ? get(presetValues, `input_${field.id}`, false)
                            : ifDefaultValue(field)
                    }
                    wrapClassName={inputWrapperClass}
                />
            )
        case `select`:
            return (
                <Select
                    className={field.cssClass}
                    description={field.description}
                    descriptionPlacement={getPlacement(
                        formSettings.descriptionPlacement,
                        field.descriptionPlacement
                    )}
                    errors={errors[`input_${field.id}`]}
                    key={field.id}
                    label={field.label}
                    name={`input_${field.id}`}
                    options={JSON.parse(field.choices)}
                    register={register}
                    required={field.isRequired}
                    value={ifDefaultValue(field)}
                    wrapClassName={inputWrapperClass}
                />
            )
        case `multiselect`:
            return (
                <Multiselect
                    className={field.cssClass}
                    description={field.description}
                    descriptionPlacement={getPlacement(
                        formSettings.descriptionPlacement,
                        field.descriptionPlacement
                    )}
                    errors={errors[`input_${field.id}`]}
                    key={field.id}
                    label={field.label}
                    name={`input_${field.id}`}
                    options={JSON.parse(field.choices)}
                    register={register}
                    required={field.isRequired}
                    value={ifDefaultValue(field)}
                    wrapClassName={inputWrapperClass}
                />
            )
        case `number`:
            return (
                <Input
                    className={field.cssClass}
                    description={field.description}
                    descriptionPlacement={getPlacement(
                        formSettings.descriptionPlacement,
                        field.descriptionPlacement
                    )}
                    errors={errors[`input_${field.id}`]}
                    inputMaskValue={field.inputMaskValue}
                    key={field.id}
                    label={field.label}
                    maxLength={field.maxLength || null}
                    name={`input_${field.id}`}
                    placeholder={field.placeholder}
                    register={register}
                    required={field.isRequired}
                    type={field.type}
                    value={
                        get(presetValues, `input_${field.id}`, false)
                            ? get(presetValues, `input_${field.id}`, false)
                            : ifDefaultValue(field)
                    }
                    wrapClassName={inputWrapperClass}
                />
            )
        case `checkbox`:
            errorKey = filteredKeys(errors, RegExp(`input_${field.id}_`))
            return (
                <Checkbox
                    className={field.cssClass}
                    description={field.description}
                    descriptionPlacement={getPlacement(
                        formSettings.descriptionPlacement,
                        field.descriptionPlacement
                    )}
                    errors={errorKey.length > 0 ? errors[errorKey[0]] : null}
                    key={field.id}
                    label={field.label}
                    name={`input_${field.id}`}
                    options={JSON.parse(field.choices)}
                    register={register}
                    required={field.isRequired}
                    wrapClassName={inputWrapperClass}
                />
            )
        case `radio`:
            errorKey = filteredKeys(errors, RegExp(`input_${field.id}_`))
            return (
                <Radio
                    className={field.cssClass}
                    description={field.description}
                    descriptionPlacement={getPlacement(
                        formSettings.descriptionPlacement,
                        field.descriptionPlacement
                    )}
                    errors={errorKey.length > 0 ? errors[errorKey[0]] : null}
                    key={field.id}
                    label={field.label}
                    name={`input_${field.id}`}
                    options={JSON.parse(field.choices)}
                    register={register}
                    required={field.isRequired}
                    wrapClassName={inputWrapperClass}
                />
            )
        case `hidden`:
            return (
                <Input
                    className={field.cssClass}
                    description={field.description}
                    descriptionPlacement={getPlacement(
                        formSettings.descriptionPlacement,
                        field.descriptionPlacement
                    )}
                    errors={errors[`input_${field.id}`]}
                    key={field.id}
                    label={field.label}
                    name={`input_${field.id}`}
                    placeholder={field.placeholder}
                    register={register}
                    required={field.isRequired}
                    type={field.type}
                    value={
                        get(presetValues, `input_${field.id}`, false)
                            ? get(presetValues, `input_${field.id}`, false)
                            : ifDefaultValue(field)
                    }
                    wrapClassName={inputWrapperClass}
                />
            )
        case `html`:
            return (
                <Html
                    className={field.cssClass}
                    content={field.content}
                    description={field.description}
                    descriptionPlacement={getPlacement(
                        formSettings.descriptionPlacement,
                        field.descriptionPlacement
                    )}
                    key={field.id}
                    label={field.label}
                    name={`input_${field.id}`}
                    type={field.type}
                    wrapClassName={inputWrapperClass}
                />
            )
        default:
            return null
    }
}
