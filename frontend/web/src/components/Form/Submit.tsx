import { Field } from 'formik'
import React from 'react'
import styled from 'styled-components'

const Button = styled(Field)`
	background-color: #ffffff;
	color: #1f1f1f;
	width: 418px;
	padding: 20px 0;
	text-align: center;
	border: none;
	border: 1.5px solid #ffffff;
	font-family: 'Inter', sans-serif;
	font-size: 17px;
	font-weight: 600;
`

interface SubmitProps {
	value: string
}

export const Submit: React.FC<SubmitProps> = ({ value }) => {
	return <Button type={'submit'} value={value} />
}
