import styled from 'styled-components'

export const Content = styled.div<{ img: string }>`
	height: calc(100vh - 80px);
	width: 100%;
	margin-top: 40px;
	position: relative;

	background-image: url(${(props) => props.img});
	background-size: cover;
	background-position: center;
`
