/* eslint-disable default-case */

/*
PROPS:
text Required
onClick Required
color [primary, secondary, success, danger, warning, info, light, dark] default primary 
variant [filled, outline, icon, round] default filled
disabled boolean default false
loading boolean default false
size [xs, sm, xs, lg] default sm
*/

import React from 'react'
import classnames from 'classnames'
import { Spinner } from '../index'

function Variant(variant, color, size) {
	switch (variant) {
		case 'outline':
			return 'btn-outline' + color + ' ' + size
		case 'round':
			return 'btn' + color + ' btn-round ' + size
		case 'round-outline':
			return 'btn-outline' + color + ' btn-round ' + size
		case 'soft':
			return 'btn-soft' + color + ' ' + size
		case 'square':
			return 'btn-outline' + color + ' btn-square ' + size
		case 'outline-square':
			return 'btn' + color + ' btn-square btn-outline-dashed ' + size
		case 'icon-square':
			return 'btn' + color + ' btn-icon-square ' + size
		case 'icon-square-outline':
			return 'btn-outline' + color + ' btn-icon-square ' + size
		case 'icon-circle':
			return 'btn' + color + ' btn-icon-circle ' + size
		case 'icon-circle-outline':
			return 'btn-outline' + color + ' btn-icon-circle ' + size
		case 'icon':
			return 'btn border-0 text' + color + ' ' + size
		default:
			return 'btn' + color + ' ' + size
	}
}

function Button(props) {
	var color = {
		primary: '-primary',
		secondary: '-secondary',
		success: '-success',
		warning: '-warning',
		info: '-info',
		danger: '-danger',
		dark: '-dark',
		light: '-light',
		link: '-link',
	}
	var size = {
		xl: 'btn-xl',
		lg: 'btn-lg',
		md: '',
		sm: 'btn-sm',
		xs: 'btn-xs',
	}
	return (
		<button
			id={
				props.id !== undefined ? props.id : Math.random().toString(36).substring(7)
			}
			className={classnames(
				'btn waves-effect',
				props.className,
				Variant(
					props.variant === undefined ? 'btn' : props.variant,
					props.color === undefined ? color['primary'] : color[props.color],
					props.size === undefined ? size['sm'] : size[props.size]
				)
			)}
			type={props.type === undefined ? 'button' : props.type}
			disabled={props.loading === true || props.disabled === true ? true : false}
			onClick={props.onClick !== undefined ? props.onClick : null}
			form={props.form !== undefined ? props.form : null}
			ref={props.forwardedRef !== undefined ? props.forwardedRef : null}
			title={props.title !== undefined ? props.title : null}
			data-bs-toggle={props.toggle ? props.toggle : null}
			data-bs-target={props.target ? '#' + props.target : null}
			data-bs-dismiss={props.dismiss ? props.dismiss : null}
			aria-controls={props.target ? props.target : null}
		>
			{props.loading === true ? <Spinner size='sm' className='me-1' /> : <></>}
			{props.text}
		</button>
	)
}

export default Button
