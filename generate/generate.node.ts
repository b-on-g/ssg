namespace $ {

	const base_url = 'http://localhost:9080/bog/ssg/-/test.html'
	const content_dir = 'bog/ssg/content'
	const output_dir = 'bog/ssg/-/static'

	const content_path = $mol_file.relative( content_dir )
	const output_path = $mol_file.relative( output_dir )

	const pages = content_path.sub().filter(
		file => file.name().endsWith( '.md' )
	).map(
		file => file.name().replace( /\.md$/, '' )
	)

	console.log( `[ssg] Found ${ pages.length } pages: ${ pages.join( ', ' ) }` )

	async function generate() {

		const browser = await $node.puppeteer.launch({
			headless: true,
			defaultViewport: { width: 1024, height: 10000 },
		})

		for( const slug of pages ) {

			const url = `${ base_url }#!page=${ slug }`
			console.log( `[ssg] Rendering ${ slug }` )

			const page = await browser.newPage()
			await page.goto( url, { waitUntil: 'networkidle0' } )

			const scripts = await page.$$( 'script' )
			await Promise.all( scripts.map( s => s.evaluate( ( n: any ) => n.remove() ) ) )

			const html = await page.content()
			await page.close()

			const file = output_path.resolve( `${ slug }.html` )
			file.text( html )

			console.log( `[ssg] Saved ${ slug }.html` )
		}

		await browser.close()
		console.log( `[ssg] Done: ${ pages.length } static pages` )
		process.exit( 0 )
	}

	generate().catch( error => {
		console.error( '[ssg] Error:', error )
		process.exit( 1 )
	})

}
