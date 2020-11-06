export default function orNotFilter(value) {
    const map = { true: '是', false: '否', 1: '是', 0: '否' };

    return map[value] || '--';
}
