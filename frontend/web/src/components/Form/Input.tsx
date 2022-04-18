import { Field as FormikField } from 'formik'
import styled from 'styled-components'

const FieldWrapper = styled.div<{ isError: boolean }>`
	position: relative;
	width: 400px;
	padding: 20px 0 20px 15px;
	background: none;
	border: 1.5px solid ${(props) => (props.isError ? '#ff6464' : '#ffffff')};

	&:not(:last-child) {
		margin-bottom: 15px;
	}
`

const Field = styled(FormikField)<{ isError: boolean }>`
	font-size: 15px;
	width: 100%;
	color: ${(props) => (props.isError ? '#ff6464' : '#ffffff')};
	border: none;
	padding: 0;
	margin: 0;
	background: none;
	position: relative;

	&::placeholder {
		color: ${(props) => (props.isError ? '#ff646480' : '#ffffff80')};
		margin: 0;
	}

	&:focus {
		outline: none;
	}
`

const LabelWrapper = styled.div`
	position: absolute;
	right: 430px;
	top: 2px;
	display: flex;
	flex-direction: column;
	text-align: right;
`

const Label = styled.label`
	font-size: 15px;
	font-weight: 400;
	color: #ffffff;
`

const Description = styled.span<{ isError: boolean }>`
	font-size: 15px;
	font-weight: 400;
	color: ${(props) => (props.isError ? '#ff6464' : '#ffffffbf')};
	white-space: nowrap;
`

interface InputProps {
	type: string
	name: string
	placeholder: string
	description: string
	error?: string
}

export const Input: React.FC<InputProps> = ({
	type,
	name,
	placeholder,
	description,
	error,
}) => {
	return (
		<FieldWrapper isError={!!error}>
			<LabelWrapper>
				<Label htmlFor="name">
					{name.charAt(0).toUpperCase() + name.slice(1)}
				</Label>
				<Description isError={!!error}>{error || description}</Description>
			</LabelWrapper>
			<Field
				type={type}
				name={name}
				placeholder={placeholder}
				isError={!!error}
			/>
		</FieldWrapper>
	)
}
