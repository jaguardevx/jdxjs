/**
 * Gestor de Eventos, utilizado en jdx.gevento y jdx.app.gevento
 */
class Gestor_Eventos
{
	////////////////////////////////////////////////////////////////////////////////
	/** Array de eventos, los eventos contienen a los suscriptores */
	protected _eventos : {
		[key: string]: // id_evento
		{
			[key: string]: // id_suscriptor
				(param: object) => void // función a ejecutar
		}
	};
	////////////////////////////////////////////////////////////////////////////////


	////////////////////////////////////////////////////////////////////////////////
	/**
	 * Constructor
	 */
	constructor() {
		this._eventos = {};
	}

	////////////////////////////////////////////////////////////////////////////////
	/**
	 * Si el id_suscriptor no esta aun registrado, lo registra
	 * @param id_evento string, nombre del evento
	 * @param id_suscriptor string, identificador del suscriptor, se usa como llave en la lista
	 * @param fn function, función callback
	 */
	public suscribir(id_evento: string, id_suscriptor: string, fn: (param: object) => void) {
		try {
			// si el id_evento no existe
			if(typeof this._eventos[id_evento] == "undefined") {
				// se registrar evento
				this._eventos[id_evento] = {};
			}

			// si el suscriptor no existe
			if(typeof this._eventos[id_evento][id_suscriptor] == 'undefined') {
				// se registra el suscriptor
				this._eventos[id_evento][id_suscriptor] = fn;
			} else {
				throw `El id_suscriptor: "${id_suscriptor}" ya se encuentra registrado en el evento: "${id_evento}"`;
			}
		} catch (error) {
			console.log(error);
		}	
	}
	////////////////////////////////////////////////////////////////////////////////

	
	////////////////////////////////////////////////////////////////////////////////
	/**
	 * elimina el suscriptor
	 * @param id_evento string, nombre del evento
	 * @param id_suscriptor string, identificador del suscriptor
	 */
	public desuscribir(id_evento: string, id_suscriptor: string)
	{
		// si el evento existe
		if(typeof this._eventos[id_evento][id_suscriptor] != 'undefined') {
			// elimina el suscriptor
			delete this._eventos[id_evento][id_suscriptor];
		}
	}
	////////////////////////////////////////////////////////////////////////////////


	////////////////////////////////////////////////////////////////////////////////
	/**
	 * Lanza la notificación de este evento
	 * @param id_evento string, nombre del evento
	 * @param param object, parámetro para enviar al notificar
	 */
	public notificar(id_evento: string, param: object = {})
	{
		// si el evento existe
		if(typeof this._eventos[id_evento] != 'undefined') {
			// recorrer los suscriptores
			Object.keys(this._eventos[id_evento]).forEach(id_suscriptor => {
				// notificar
				this._eventos[id_evento][id_suscriptor](param);
			});
		}
	}
	////////////////////////////////////////////////////////////////////////////////


} // fin clase Gestor_Eventos