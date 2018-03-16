
class StringHelper {
    constructor() {
        
    }

    _replaceSpecialCharacter(title, strReplace='') {

        return title.replace('~', strReplace)
                .replace('`', strReplace).replace('!', strReplace).replace('@', strReplace).replace('#', strReplace).replace('$', strReplace).replace('%', strReplace).replace('^', strReplace)
                .replace('+', strReplace).replace('_', strReplace).replace(')', strReplace).replace('(', strReplace).replace('*', strReplace).replace('&', strReplace)
                .replace('=', strReplace).replace('[', strReplace).replace('{', strReplace).replace(']', strReplace).replace('}', strReplace).replace(':', strReplace).replace(';', strReplace)
                .replace('?', strReplace).replace('.', strReplace).replace('>', strReplace).replace('<', strReplace).replace(',', strReplace).replace("'", strReplace).replace('"', strReplace)
                .replace('/', strReplace).replace('\\', strReplace).replace('|', strReplace);
    }

    _replaceSpecialCharacterMulti(title, strReplace='') {

        return title.replace(/\-+/ig, ' ').replace(/\~+/i, strReplace)
        .replace(/\`+/i, strReplace).replace(/\!+/ig, strReplace).replace(/\@+/ig, strReplace).replace(/\#+/ig, strReplace).replace(/\$+/ig, strReplace).replace(/\%+/ig, strReplace).replace(/\^+/ig, strReplace)
        .replace(/\++/i, strReplace).replace(/\_+/ig, strReplace).replace(/\)+/ig, strReplace).replace(/\(+/ig, strReplace).replace(/\*+/ig, strReplace).replace(/\&+/ig, strReplace)
        .replace(/\=+/i, strReplace).replace(/\[+/ig, strReplace).replace(/\{+/ig, strReplace).replace(/\]+/ig, strReplace).replace(/\}+/ig, strReplace).replace(/\:+/ig, strReplace).replace(/\;+/ig, strReplace)
        .replace(/\?+/i, strReplace).replace(/\.+/ig, strReplace).replace(/\>+/ig, strReplace).replace(/\<+/ig, strReplace).replace(/\,+/ig, strReplace).replace(/\'+/ig, strReplace).replace(/\"+/ig, strReplace)
        .replace(/\/+/i, strReplace).replace(/\\+/ig, strReplace).replace(/\|+/ig, strReplace).replace(/\-+/ig, strReplace);
    }


    removeSpecialCharacters (title, multi=false) {
        title = title.toLowerCase();
        if( multi ) return this._replaceSpecialCharacterMulti(title);
        return this._replaceSpecialCharacter(title); 
    }

    shallowCompare (title1, title2) {
    
        if( title1 == null || title2 == null ) return false;
    
        title1 = title1.trim().toLowerCase();
        title1 = this._replaceSpecialCharacterMulti(title1);
    
        title2 = title2.trim().toLowerCase();
        title2 = this._replaceSpecialCharacterMulti(title2);

        if( title1 == title2 ) {
            return true;
        }
        return false;
    }

    deepCompare (title1, title2, strReplace='') {

        if( title1 == null || title2 == null ) return false;
    
        title1 = title1.trim().toLowerCase();
        title1 = this._replaceSpecialCharacterMulti(title1, strReplace);
        splitTitle1 = title1.split(' ');
    
        title2 = title2.trim().toLowerCase();
        title2 = this._replaceSpecialCharacterMulti(title2, strReplace);
        splitTitle2 = title2.split(' ');
    
    
        if( splitTitle1.length === splitTitle2.length ) {
    
            splitTitle1.forEach((value) => {
                title2 = title2.replace(value, '');
            });
    
            if( title2 == '' || title2.trim().length == 0 ) {
                return true;
            }
            return false;
        } 
    
        return false;
    }

    convertToSearchQueryString (title, replaceChar='-', is_remove_character=true) {

        title = is_remove_character ? this._replaceSpecialCharacter(title).toLowerCase() : title.toLowerCase();
    
        let titles = title.split(' ');
        let titles_temp = [];
    
        titles.forEach( (value) => {
    
            if( value != '' || value != ' ' ) {
    
                titles_temp.push(value);
            }
        });
    
        title = titles_temp.join(replaceChar);
        return title;
    }


    getLabelVideo(size) {

        
    }

}

module.exports = exports.default = new StringHelper();