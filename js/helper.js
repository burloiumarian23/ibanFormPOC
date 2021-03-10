let __errors = []

export async function request( url = '', method = "GET", data = {} ) {
  // Default options are marked with *
  const response = await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  })
  return response.json() // parses JSON response into native JavaScript objects
}

export function debouncer( fn, timer) {
	let timeId = null
	return ( ...args ) => {
		if( timeId ) {
			clearTimeout( timeId )
		}
		timeId = setTimeout( () => {
			fn( args )
		}, timer )
	}
}

function __modulo(aNumStr, aDiv) {
    let tmp = "", r
	for ( let i = 0; i < aNumStr.length ; i++ ) {
		tmp += aNumStr.charAt(i) 
		r = tmp % aDiv 
		tmp = r.toString() 
	} 
	return tmp / 1 
}

export function handleErrors( input, success ) {
	if( success )  input.parentElement.classList.remove('has-danger')
	if( !success ) input.parentElement.classList.add('has-danger')
	if( __errors.indexOf( input.id ) == -1 && !success ) __errors.push( input.id ) 
	if( __errors.indexOf( input.id ) != -1 && success )  __errors.splice( __errors.indexOf( input.id ), 1 )
}

export function showErrors( input ) {
	let inputErrorText = ``
	if( input.lastChild ) input.removeChild( input.lastChild )
	for( let inputId of __errors ) {
		inputErrorText += `$[inputId} is invalid.\n`
	}
	let text = document.createTextNode( inputErrorText )
}

export function isNumber( value ) {
	if( value.length == 0 ) return false
	if( value.includes("-") ) return false
	return !isNaN( value ) 
}

/**
 * [__checkForm CHECKS IF INPUTS ARE REQUIERED AND LENGTH OF EACH INPUTS CORRESPONDS WITH VALIDATION SCHEMA]
 * @param  {[ STRING ]} formId           [description]
 * @param  {[ OBJECT ]} validationSchema [description]
 * @return {[type]}                      [description]
 */
function __checkForm( formId, validationSchema )
{
	let inputs  = document.querySelectorAll( formId + " input" )
	let invalid = false
	let isValid = 0
	for( let input of inputs )
	{
		if( validationSchema.hasOwnProperty( input.id ) && validationSchema[ input.id ].required )
		{
			if( input.value.length > validationSchema[ input.id ].minLength ) isValid += 1
		}
	}
	return isValid == inputs.length ? true : false
}
/**
 * [isFormValid IF THERE IS NO ERROR AND SCHEMA VALIDATION IS RESPECTED THAN YOU CAN NOW SUBMIT FORM ]
 * @param  {[ STRING ]}  formId           [description]
 * @param  {[ OBJECT ]}  validationSchema [description]
 * @return {Boolean}                  [description]
 */
export function isFormValid( formId, validationSchema ) {
	let boolean = __checkForm( formId, validationSchema )
	return !__errors.length && boolean
}

export function isIBAN(iban) {
    //Move front 4 digits to the end
    if( iban.length == 0 ) return false
    let rearrange = iban.substring( 4, iban.length) + iban.substring(0, 4) 

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('') 
    let alphaMap = {} 
    let number = [] 
    alphabet.forEach( ( value, index ) => alphaMap[ value ] = index + 10 ) 
    rearrange.split('').forEach( ( value, index ) => number[index] = alphaMap[value] || value )
    return __modulo( number.join('').toString() , 97 ) === 1
}