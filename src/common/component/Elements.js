import React from "react";
import classnames from "classnames";
import Select from "react-select";

function Elements(props) {
  function formElement(elementObj) {
    // eslint-disable-next-line default-case
    switch (elementObj.type) {
      case "email":
      case "password":
      case "date":
      case "text":
      case "time":
      case "datetime-local":
        return (
          <div
            key={elementObj.id}
            className={
              elementObj.className !== undefined
                ? "form-group " + elementObj.className
                : "form-group"
            }
          >
            {elementObj.label !== undefined ? (
              <label
                htmlFor={elementObj.id}
                className="w-100 text-start font-weight-bold"
              >
                {elementObj.label}
              </label>
            ) : null}
            <input
              type={elementObj.type}
              id={elementObj.id}
              name={elementObj.id}
              placeholder={elementObj.placeholder}
              disabled={
                elementObj.disabled !== undefined ? elementObj.disabled : false
              }
              defaultValue={elementObj.value}
              onChange={(e) =>
                elementObj.onchange(e.target.value, elementObj.id)
              }
              autoComplete="off"
              autoFocus={
                elementObj.autoFocusFlag ? elementObj.autoFocusFlag : false
              }
              required={
                elementObj.requiredFlag ? elementObj.requiredFlag : false
              }
              readOnly={elementObj.readOnly ? elementObj.readOnly : false}
              className={classnames("form-control", {
                "form-control-sm": elementObj.size === "sm",
                "form-control-lg": elementObj.size === "lg",
                [elementObj.inputClassName]:
                  elementObj.inputClassName !== undefined,
              })}
            />
            <div className="form-control-feedback font-14" />
          </div>
        );
      case "number":
        return (
          <div
            key={elementObj.id}
            className={
              elementObj.className !== undefined
                ? "form-group " + elementObj.className
                : "form-group"
            }
          >
            {elementObj.label ? (
              <label
                htmlFor={elementObj.id}
                className="w-100 text-start font-weight-bold"
              >
                {elementObj.label}
              </label>
            ) : null}
            <input
              type={elementObj.type}
              id={elementObj.id}
              name={elementObj.id}
              placeholder={elementObj.placeholder}
              disabled={
                elementObj.disabled !== undefined ? elementObj.disabled : false
              }
              defaultValue={elementObj.value}
              onChange={(e) =>
                elementObj.onchange(e.target.value, elementObj.id)
              }
              autoComplete="off"
              min={elementObj.min !== undefined ? elementObj.min : null}
              max={elementObj.max !== undefined ? elementObj.max : null}
              required={
                elementObj.requiredFlag ? elementObj.requiredFlag : false
              }
              className={classnames("form-control", {
                "form-control-sm": elementObj.size === "sm",
                "form-control-lg": elementObj.size === "lg",
                [elementObj.inputClassName]:
                  elementObj.inputClassName !== undefined,
              })}
            />
          </div>
        );
      case "textarea":
        return (
          <div key={elementObj.id} className="form-group">
            {elementObj.label ? (
              <label
                htmlFor={elementObj.id}
                className="w-100 text-start font-weight-bold"
              >
                {elementObj.label}
              </label>
            ) : null}
            <textarea
              id={elementObj.id}
              name={elementObj.id}
              placeholder={elementObj.placeholder}
              disabled={
                elementObj.disabled !== undefined ? elementObj.disabled : false
              }
              defaultValue={elementObj.value}
              onChange={(e) =>
                elementObj.onchange(e.target.value, elementObj.id)
              }
              required={
                elementObj.requiredFlag ? elementObj.requiredFlag : false
              }
              autoComplete="off"
              className={classnames("form-control", {
                "form-control-sm": elementObj.size === "sm",
                "form-control-lg": elementObj.size === "lg",
              })}
              rows="5"
            />
          </div>
        );
      case "select":
        return (
          <div key={elementObj.id} className="form-group">
            <div className="mb-3">
              <label className="w-100 text-start font-weight-bold">
                {elementObj.label}
              </label>
            </div>
            <div className="xs-12 mb-9"></div>
          </div>
        );
      case "file":
        return (
          <div>
            {elementObj.label !== undefined ? (
              <label className="w-100 text-start font-weight-bold">
                {elementObj.label}
              </label>
            ) : null}
            <input
              type="file"
              id={elementObj.id}
              // name={elementObj.id}
              className={
                elementObj.className !== undefined
                  ? "dropify " + elementObj.className
                  : "dropify"
              }
              onChange={(e) =>
                elementObj.onchange(e.target.files, elementObj.id)
              }
              required={
                elementObj.requiredFlag ? elementObj.requiredFlag : false
              }
              disabled={
                elementObj.disabled !== undefined ? elementObj.disabled : false
              }
              multiple={elementObj.multiple ? elementObj.multiple : false}
              data-allowed-file-extensions={
                elementObj["data-allowed-file-extensions"] !== undefined
                  ? elementObj["data-allowed-file-extensions"]
                  : false
              }
            />
          </div>
        );
      case "react_select":
        return (
          <div
            className={
              elementObj.className !== undefined
                ? "form-group w-100 " + elementObj.className
                : "form-group w-100"
            }
            key={elementObj.id}
          >
            {elementObj.label !== undefined ? (
              <label className="w-100 text-start font-weight-bold">
                {elementObj.label}
              </label>
            ) : null}
            <Select
              components={{
                DropdownIndicator: () => null,
              }}
              value={elementObj.value}
              inputValue={elementObj.inputValue}
              isSearchable={
                elementObj.isSearchable !== undefined
                  ? elementObj.isSearchable
                  : true
              }
              options={elementObj.options}
              className="w-100"
              isMulti={
                elementObj.isMulti !== undefined ? elementObj.isMulti : false
              }
              onChange={(val) => elementObj.onchange(val, elementObj.id)}
              onInputChange={
                elementObj.onInputChange !== undefined
                  ? (val) => elementObj.onInputChange(val, elementObj.id)
                  : (val) => {}
              }
              getOptionLabel={
                elementObj.labelKey
                  ? (option) => option[elementObj.labelKey]
                  : (option) => option.label
              }
              getOptionValue={
                elementObj.valueKey
                  ? (option) => option[elementObj.valueKey]
                  : (option) => option.value
              }
              placeholder={
                elementObj.placeholder !== undefined
                  ? elementObj.placeholder
                  : ""
              }
              isDisabled={
                elementObj.disabled !== undefined ? elementObj.disabled : false
              }
              isLoading={
                elementObj.loading !== undefined ? elementObj.loading : false
              }
              defaultValue={
                elementObj.defaultValue !== undefined
                  ? elementObj.defaultValue
                  : ""
              }
              styles={
                elementObj.styles
                  ? {
                      ...elementObj.styles,
                      menu: (provided, state) => ({ ...provided, zIndex: 2 }),
                    }
                  : { menu: (provided, state) => ({ ...provided, zIndex: 2 }) }
              }
            />
          </div>
        );
      case "radio":
        return (
          <>
            {elementObj.label !== undefined ? (
              <label className="w-100 text-start font-weight-bold">
                {elementObj.label}
              </label>
            ) : null}
            {elementObj.options.map((item) => (
              <div
                key={elementObj.name + "_" + item.label}
                className={"form-check me-2 " + elementObj.className}
              >
                <input
                  type={elementObj.type}
                  id={elementObj.name + "_" + item.label}
                  name={elementObj.name}
                  disabled={item.disabled !== undefined ? item.disabled : false}
                  checked={elementObj.value === item.value}
                  onChange={(e) => {
                    elementObj.onchange(item.value, elementObj.name);
                  }}
                  className={
                    elementObj.size !== undefined
                      ? "form-check-input " + elementObj.size
                      : "form-check-input md"
                  }
                />
                {item.label !== undefined ? (
                  <label
                    className="form-check-label"
                    htmlFor={elementObj.name + "_" + item.label}
                  >
                    {item.label}
                  </label>
                ) : null}
              </div>
            ))}
          </>
        );
      case "checkbox":
        return (
          <div
            key={elementObj.id}
            className={
              elementObj.className !== undefined
                ? "form-check " + elementObj.className
                : "form-group form-check"
            }
          >
            <input
              type={elementObj.type}
              id={elementObj.id}
              name={elementObj.id}
              disabled={
                elementObj.disabled !== undefined ? elementObj.disabled : false
              }
              defaultChecked={elementObj.value}
              onChange={(e) => {
                elementObj.onchange(!elementObj.value, elementObj.id);
              }}
              className={
                elementObj.size !== undefined
                  ? "form-check-input " + elementObj.size
                  : "form-check-input md"
              }
            />
            {elementObj.label !== undefined ? (
              <label className="form-check-label" htmlFor={elementObj.id}>
                {elementObj.label}
              </label>
            ) : null}
          </div>
        );
      case "switch":
        return (
          <div key={elementObj.id} className="form-check form-switch">
            <input
              id={elementObj.id}
              type="checkbox"
              checked={elementObj.value}
              disabled={
                elementObj.disabled !== undefined ? elementObj.disabled : false
              }
              className="form-check-input"
              onChange={() => {
                elementObj.onchange(!elementObj.value, elementObj.id);
              }}
            />
            {elementObj.label !== undefined ? (
              <label className="form-check-label" htmlFor={elementObj.id}>
                {elementObj.label}
              </label>
            ) : null}
          </div>
        );
    }
  }

  return (
    <>
      {props.formField.map((field) => {
        let v = field.visible !== undefined ? field.visible : true;
        if (v) return formElement(field);
        else return <></>;
      })}
    </>
  );
}

export default Elements;
