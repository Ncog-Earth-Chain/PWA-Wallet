<template>
    <span class="f-select">
        <slot name="top" v-bind="slotProps">
            <label :for="id">{{ label }}</label>
        </slot>
        <select
            :id="id"
            ref="select"
            v-bind="selectProps"
            :value="val"
            class="inp"
            :aria-invalid="isInvalid"
            :aria-describedby="ariaDescribedBy"
            @change="onChange"
        >
            <option v-for="item in data" :key="item.value" :value="item.value" :disabled="item.disabled">
                {{ item.label }}
            </option>
        </select>
        <slot name="bottom" v-bind="slotProps"></slot>
    </span>
</template>

<script>
import { helpersMixin } from '@/mixins/helpers.js';
import { selectMixin } from '@/mixins/select.js';
import { getUniqueId } from '@/utils';

export default {
    name: 'FSelect',

    mixins: [selectMixin, helpersMixin],

    model: {
        prop: 'value',
        event: 'change',
    },

    props: {
        /**
         * Data for select element
         *
         * @type {[{value: string|number, label: string, disabled: boolean}]}
         */
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        /** Custom validator function */
        validator: {
            type: Function,
            default: null,
        },
        /**
         * Size of select 'large' | 'small'
         *
         * @type {('large' | 'small')}
         */
        selectSize: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            val: this.value,
            isInvalid: this.invalid,
            errmsgslot: 'bottom',
            ariaDescribedBy: null,
        };
    },

    computed: {
        inpClasses() {
            return {
                invalid: this.isInvalid,
                large: this.selectSize === 'large',
                small: this.selectSize === 'small',
                disabled: this.disabled,
            };
        },

        slotProps() {
            return {
                showErrorMessage: this.isInvalid,
                showInfoMessage: this.showInfoMessage,
            };
        },

        showInfoMessage() {
            return this.hideInfoOnError ? !this.isInvalid : true;
        },
    },

    watch: {
        value(_val) {
            this.val = _val;
        },

        isInvalid() {
            this.setAriaDescribedBy();
        },
    },

    mounted() {
        this.setAriaDescribedBy();
    },

    methods: {
        /**
         * Set aria-describedby attribute according to `isInvalid` property if FMessage child component exists.
         */
        setAriaDescribedBy() {
            const eSelect = this.$refs.select;
            let fMessage;

            if (this.isInvalid) {
                fMessage = this.getFMessage('error');
            } else {
                fMessage = this.getFMessage('info');
                // eSelect.setCustomValidity('');
                // this.ariaDescribedBy = null;
            }

            if (fMessage) {
                // set custom error message
                if (this.isInvalid) {
                    eSelect.setCustomValidity(fMessage.getMessage());
                } else {
                    eSelect.setCustomValidity('');
                }

                const id = getUniqueId();
                fMessage.$el.id = id;
                this.ariaDescribedBy = id;
            } else {
                this.ariaDescribedBy = null;
            }
        },

        async validate(_setError) {
            if (this.validator) {
                const result = this.validator(this.val);

                if (result instanceof Promise) {
                    const value = await result;
                    this.isInvalid = !value;
                } else {
                    this.isInvalid = !result;
                }

                if (_setError) {
                    this.setAriaDescribedBy();
                }
            }
        },

        /**
         * Get FMessage child component by type.
         *
         * @param {string} _type
         * @return {null|*|Vue}
         */
        getFMessage(_type) {
            const fMessages = this.findChildrenByName('f-message', true);
            let fMessage = null;

            for (let i = 0, len1 = fMessages.length; i < len1; i++) {
                fMessage = fMessages[i];
                if (fMessage && fMessage.$props.type === _type) {
                    break;
                }
            }

            return fMessage;
        },

        /**
         * @param {Event} _event
         */
        onChange(_event) {
            this.val = _event.target.value;

            this.$emit('change', this.val);

            this.validate();
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
