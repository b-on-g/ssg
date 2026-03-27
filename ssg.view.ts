namespace $.$$ {
	export class $bog_ssg extends $.$bog_ssg {

		@ $mol_mem
		page_slug() {
			return this.$.$mol_state_arg.value( 'page' ) ?? 'index'
		}

		@ $mol_mem
		page_title() {
			const text = this.content_text()
			const match = text.match( /^#\s+(.+)$/m )
			return match?.[ 1 ] ?? this.page_slug()
		}

		@ $mol_mem
		content_text() {
			const slug = this.page_slug()
			return this.$.$mol_fetch.text( `/bog/ssg/content/${ slug }.md` )
		}

	}
}
