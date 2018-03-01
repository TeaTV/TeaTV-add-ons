## Structure of library string_helper

each function in this lib will use others case when handing data from sources

removeSpecialCharacters
- `desc`: 
    + this function remove special character from string input
- `input`
    + `title`: string, string want remove special characters
    + `multi`: boolean
        + `true`: remove character appear many times in string.
        + `false`: remove first character in string.
- `output`
    + `string`
- `example`
    + `multi = true`: 
        + eg: spider-man: home-coming => spiderman homecoming
    + `multi = false`:
        + eg: spider-man: homecoming => spiderman homecoming

shallowCompare
- `desc`
    + this function compare two string
- `input`
    + `title1`: string
    + `title2`: string
- `output`
    + `boolean`
        + true: if two strings same
        + false: if two string not same
- `example`
    + `true`:
        eg: 'spider-man:homecoming' = 'spidermanhomecoming'
    + `false`: 
        eg: 'spider-man:homecoming' != 'spider-man:homecoming2017'

convertToSearchQueryString
- `desc`
    + this function convert from string to slug in url

- `input`
    + `title`: string, string want convert to slug url
    + `replaceChar`: string, character want replace in title, default is character '-'
    + `isRemoveCharacterSpecial`: boolean
        + `true`: remove all special character in title
        + `false`: not remove special character
- `output`:
    + `isRemoveCharacterSpecial = true`:
        + eg: 'spider-man: homecoming' => 'spiderman-homecoming'

    + `isRemoveCharacterSpecial = false`:
        + eg: 'spider-man homecoming' => 'spider-man-homecoming'


