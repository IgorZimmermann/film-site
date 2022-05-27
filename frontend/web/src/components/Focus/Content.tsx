import styled from 'styled-components'

export const Content = styled.div<{ img: string; small?: boolean }>`
	height: calc(${(props) => (props.small ? '80vh' : '100vh')} - 80px);
	width: 100%;
	margin-top: 40px;
	position: relative;

	background-image: url(${(props) => props.img});
	background-size: cover;
	background-position: center;
`
