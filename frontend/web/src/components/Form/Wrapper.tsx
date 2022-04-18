import { Form as FormikForm } from 'formik'
import React from 'react'
import styled from 'styled-components'

const FormWrapper = styled.div`
	height: 100vh;
	width: 100%;
	background-color: #1f1f1f;
	color: #ffffff;
`

const Form = styled(FormikForm)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`

const FormTitle = styled.h1`
	font-size: 40px;
	font-weight: 700;
	margin: 0;
	margin-bottom: 35px;
`

interface WrapperProps {
	title: string
}

export const Wrapper: React.FC<WrapperProps> = ({ title, children }) => {
	return (
		<FormWrapper>
			<Form>
				<FormTitle>{title}</FormTitle>
				{children}
			</Form>
		</FormWrapper>
	)
}
