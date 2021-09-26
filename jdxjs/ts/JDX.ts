/**
 * Gestor de Eventos, utilizado en jdx.gestor_eventos y jdx.app.gestor_eventos
 */
class JDX
{
	////////////////////////////////////////////////////////////////////////////////
	/** administra los eventos en base al patrón observador */
	public gestor_eventos: Gestor_Eventos;

	/**	se utiliza en el método gurl */
	public host: string;

	/** href */
	public href: string;

	/**	pathname */
	public pathname: string;

	/** search, query string */
	public search: string;

	/** hash */
	public hash: string;
	////////////////////////////////////////////////////////////////////////////////


	////////////////////////////////////////////////////////////////////////////////
	/**
	 * 
	 * @param host string, host base para la URL
	 */
	constructor(host: string = location.host) {
		this.gestor_eventos = new Gestor_Eventos();

		this.host           = host;

		this.href           = location.href;
		this.pathname       = window.location.pathname;
		this.search         = window.location.search;
		this.hash           = window.location.hash;

		// para descargar script al cambiar el path
		this.gestor_eventos.suscribir('url.cambio-path', 'descargar_script', this.descargar_script.bind(this));
	}
	////////////////////////////////////////////////////////////////////////////////

 
	////////////////////////////////////////////////////////////////////////////////
	/**
	 * Actualiza los datos a partir de location
	 */
	protected _sincronizar_y_notificar() : void {
		this.href = location.href;

		// respaldar datos anteriores para comparar
		let pathname_anterior = this.pathname;
		let search_anterior = this.search;
		let hash_anterior = this.hash;

		// obtener datos actuales
		this.pathname = window.location.pathname;
		this.search = window.location.search;
		this.hash = window.location.hash;

		
		// evento path
		if(this.pathname != pathname_anterior)
		{
			this.gestor_eventos.notificar('url.cambio-path');
		}
		// evento search
		else if(this.search != search_anterior)
		{
			this.gestor_eventos.notificar('url.cambio-search');
		}
		// evento hash
		else if(this.hash != hash_anterior)
		{
			this.gestor_eventos.notificar('url.cambio-hash');
		}
	}
	////////////////////////////////////////////////////////////////////////////////

	
	////////////////////////////////////////////////////////////////////////////////
	/**
	 * devuelve una ruta absoluta a partir de una ruta relativa
	 * @param path string, ruta
	 * @returns 
	 */
	public gurl(path: string) {
		return this.host + path;
	}
	////////////////////////////////////////////////////////////////////////////////
	

	////////////////////////////////////////////////////////////////////////////////
	/**
	 * Si la URL es diferente la cambia y lanza los eventos correspondientes
	 * @param ruta_relativa string url
	 */
	public cambiar(ruta_relativa: string): void {
		// ruta absoluta
		let ruta = this.gurl(ruta_relativa);
		// si existe el evento, como por ejemplo al ser lanzado por un link
		if( window.event != undefined ) {
			// cancelar evento
			window.event.preventDefault();
		}
		

		// si la url es diferente
		if(this.href != ruta) {
			// cambiar URL
			history.pushState({}, "", ruta);
			// actualizar propiedades y notificar evento correspondiente
			this._sincronizar_y_notificar();
		}
	}
	////////////////////////////////////////////////////////////////////////////////


	////////////////////////////////////////////////////////////////////////////////
	/**
	 * descarga el script según el href
	 * @returns 
	 */
	public async descargar_script()
	{
		let archivo_js: string = 
			// si termina en "/"
			this.href.charAt(this.href.length- 1) == ('/') ?
				// eliminar la "/"
				this.href.substr(0, this.href.length - 1) :
				// si no, asignar href integro
				this.href;
		
		// agregar extensión
		archivo_js += '.js';

		// body.cargando y scroll 0,0
		let body = <HTMLBodyElement> document.querySelector('body');
		window.scroll(0,0);
		body.classList.add('cargando');

		let respuesta: Response = await fetch(archivo_js, {
            method: 'GET'
        });

		let script: string = await respuesta.text();
		eval(script);

		return respuesta;
	}
	////////////////////////////////////////////////////////////////////////////////
}