import web3utils from 'web3-utils';
import { formatNumberByLocale } from '../filters.js';

const WEI_IN_NEC = 1000000000000000000;

/**
 * @return {number}
 */
export function WEIToNEC(_value) {
    // console.log(parseFloat(web3utils.fromWei(_value, 'ether')), _value / WEI_IN_NEC);
    return _value / WEI_IN_NEC;
}

/**
 * @return {number}
 */
export function WeiToNec(_value) {
    return parseFloat(web3utils.fromWei(_value, 'ether'));
}

/**
 * @return {number}
 */
export function NECToWEI(_value) {
    return _value * WEI_IN_NEC;
}

/**
 * @param {*} _value
 * @param {number} [_tokenPrice]
 * @return {number}
 */
export function NECToUSD(_value, _tokenPrice = 0) {
    return _value * _tokenPrice;
}

/**
 * Convert value to NEC.
 *
 * @param {string|number} _value
 * @return {string}
 */
export function toNEC(_value) {
    return formatNumberByLocale(WEIToNEC(_value));
}

/**
 * Check if given string is transaction hash, address or block number.
 *
 * @return {'transaction_hash' | 'address' | 'block' | ''}
 */
export function getTypeByStr(_str) {
    let type = '';
    let num = 0;

    if (_str) {
        if (web3utils.isHexStrict(_str)) {
            if (_str.length === 66) {
                type = 'transaction_hash';
                // } else if (web3utils.toChecksumAddress(_str)) {
            } else if (web3utils.isAddress(_str)) {
                type = 'address';
            }
        } else {
            num = parseInt(_str);
            if (!isNaN(num)) {
                type = 'block';
            }
        }
    }

    return type;
}
