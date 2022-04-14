import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(100% - 80px);
	margin: 0 40px;

	& > :last-child {
		margin-bottom: 40px;
	}
`
