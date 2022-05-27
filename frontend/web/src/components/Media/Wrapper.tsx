import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(100% - 80px);
	margin: 0 40px;

	& > :not(:last-child) {
		margin-top: 40px;
	}

	& > :last-child {
		margin-top: 40px;
		margin-bottom: 40px;
	}
`
