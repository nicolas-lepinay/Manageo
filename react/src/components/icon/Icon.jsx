import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Material from './material-icons';
import pascalcase from 'pascalcase';

const RefWrapper = forwardRef(({ children }, ref) => {
	if (ref) {
		return (
			<span ref={ref} data-only-ref='true'>
				{children}
			</span>
		);
	}
	return children;
});

const Icon = forwardRef(({ icon, className, color, size, forceFamily, ...props }, ref) => {
	const _icon = pascalcase(icon);

	// eslint-disable-next-line import/namespace
	const MaterialWrapper = Material[_icon];

	const _className = classNames(
		'svg-icon',
		{ [`svg-icon-${size}`]: size, [`text-${color}`]: color },
		className,
	);

    return (
        <RefWrapper ref={ref}>
            <MaterialWrapper
                data-name={`Material--${icon}`}
                className={classNames('svg-icon--material', _className)}
                {...props}
            />
        </RefWrapper>
    );
	
});
Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	className: PropTypes.string,
	color: PropTypes.oneOf([
		null,
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
	size: PropTypes.oneOf([
		null,
		'sm',
		'md',
		'lg',
		'2x',
		'3x',
		'4x',
		'5x',
		'6x',
		'7x',
		'8x',
		'9x',
		'10x',
	]),
	forceFamily: PropTypes.oneOf([null, 'custom', 'bootstrap', 'material']),
};
Icon.defaultProps = {
	className: null,
	color: null,
	size: null,
	forceFamily: null,
};

export default memo(Icon);
