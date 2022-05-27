import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Media as Focus } from '../../../components/Focus/Media'
import { BonusContent } from '../../../components/Media/BonusContent'
import { CastRow } from '../../../components/Media/Cast'
import { MoreInformation } from '../../../components/Media/MoreInformation'
import { Navbar } from '../../../components/Media/Navbar'
import { Storyline } from '../../../components/Media/Storyline'
import { Wrapper } from '../../../components/Media/Wrapper'
import { PageWrapper } from '../../../components/PageWrapper'
import { Cast, Media, useGetMediaByUrlQuery } from '../../../generated/graphql'

const Media: NextPage = () => {
	const router = useRouter()
	const { url } = router.query
	const { loading, data } = useGetMediaByUrlQuery({
		variables: {
			options: {
				url: url as string,
			},
		},
	})

	const [showNavbar, setShowNavbar] = useState<boolean>(false)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > window.innerHeight * 0.8 - 160) {
				setShowNavbar(true)
			} else {
				setShowNavbar(false)
			}
		})
	}, [setShowNavbar])

	return (
		<div>
			{loading || !data ? (
				<span>loading...</span>
			) : (
				<PageWrapper title={`${data.getMediaByUrl?.title}`} navbar>
					{showNavbar && <Navbar data={data.getMediaByUrl as Media} />}
					{data.getMediaByUrl && (
						<Wrapper>
							<Focus id={data.getMediaByUrl.id} small />
							{data.getMediaByUrl.casts.length > 0 && (
								<CastRow casts={data.getMediaByUrl.casts as Cast[]} />
							)}
							<BonusContent media={data.getMediaByUrl as Media} />
							<Storyline data={data.getMediaByUrl as Media} />
							<MoreInformation data={data.getMediaByUrl as Media} />
						</Wrapper>
					)}
				</PageWrapper>
			)}
		</div>
	)
}

export default Media
