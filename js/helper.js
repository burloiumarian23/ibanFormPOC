let __errors = []

export async function request(url = '', method = "GET", data = {}) {
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
	let findInputs = ``
	if( input.lastElementChild ) input.remove( input.lastElementChild )
	for( let inputId of __errors ) {
		findInputs = `$[inputId} is invalid.\n`
	}
	let alert = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		${findInputs}
	</div>`
	input.append( alert )
}

export function isIBAN(iban) {
    //Move front 4 digits to the end
    let rearrange = iban.substring( 4, iban.length) + iban.substring(0, 4) 

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('') 
    let alphaMap = {} 
    let number = [] 
    alphabet.forEach( ( value, index ) => alphaMap[ value ] = index + 10 ) 
    rearrange.split('').forEach( ( value, index ) => number[index] = alphaMap[value] || value )
    return __modulo( number.join('').toString() , 97 ) === 1
}