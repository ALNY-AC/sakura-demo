<template>
    <div class="flow-tool" style="">
        <div class="flow-item" v-for="(item,i) in option" :key="item.value">
            <el-button :type="model==item.value?item.type:'default'" @click="model=item.value">{{item.label}}</el-button>
            <slot name="icon" v-if="i<option.length-1">
                <i :class="icon"></i>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FlowTool',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        icon: {
            type: String,
            default: 'el-icon-arrow-right'
        },
        option: {
            type: Array,
            default() { return [] },
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(e) {
                this.model = e;
            }
        },
        model() {
            this.input();
        }
    },
    data() {
        return {
            model: '',
        }
    },
    methods: {
        input() {
            this.$emit('input', this.model);
            this.$emit('change', this.model);
        },
    }
}
</script>

<style lang="scss" scoped>
.flow-tool {
    display: flex;
    align-items: center;
    .flow-item {
        display: flex;
        align-items: center;
        i {
            margin: 0 5px;
        }
    }
}
</style>