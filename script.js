var scheme1 = {
    name: 'gate',
    type: 'xor',
    children: [
    {
        name: 'gate',
        type: 'and',
        children: [
        {
            name: 'switch',
            state: true
        },
        {
            name: 'switch',
            state: false
        }
        ]
    }, {
        name: 'gate',
        type: 'not',
        children: [
        {
            name: 'switch',
            state: true
        }
        ]
    }
    ]
},

scheme2 = {
    name: 'gate',
    type: 'and',
    children: [
    {
        name: 'gate',
        type: 'or',
        children: [
        {
            name: 'switch',
            state: true
        },
        {
            name: 'gate',
            type: 'xor',
            children: [
            {
                name: 'switch',
                state: false
            },
            {
                name: 'gate',
                type: 'not',
                children: [
                {
                    name: 'switch',
                    state: true
                }
                ]
            }
            ]
        }
        ]
    }, {
        name: 'gate',
        type: 'not',
        children: [
        {
            name: 'switch',
            state: true
        }
        ]
    }
    ]
},

scheme3 = {
    name: 'gate',
    type: 'xor',

    children: [
    {
        name: 'gate',
        type: 'not',
        children: [
        {
            name: 'switch',
            state: false
        }
        ]
    }, 
    {
        name: 'gate',
        type: 'or',
        children: [
        {
            name: 'gate',
            type: 'or',
            children: [
            {
                name: 'switch',
                state: false
            },
            {
                name: 'gate',
                type: 'and',
                children: [
                {
                    name: 'switch',
                    state: false
                },
                {
                    name: 'switch',
                    state: true
                }
                ]
            }
            ]
        },
        {
            name: 'switch',
            state: false
        }
        ]
    }
    ]
};

var actions = {
    or: function(a,b) {
        return a || b;
    },
    and: function(a,b) {
        return a && b;
    },
    xor: function(a,b) {
        return !!(a ^ b);
    },
    not: function(a) {
        return !a;
    }
};

function setAction(type) {
    switch(type) {
        case 'or':  return actions.or; 
                    break;
        case 'and': return actions.and; 
                    break;
        case 'xor': return actions.xor; 
                    break;
        case 'not': return actions.not; 
                    break;
    } 
}

function isLigth(scheme) {
    let state;
    if(scheme.name === 'switch') {
        state = scheme.state;
    } else {
        let action = setAction(scheme.type); 
        let a = isLigth(scheme.children[0]);
        let b = scheme.children[1] ? isLigth(scheme.children[1]) : null;
        state = action(a, b);
    }
    return state;
}

console.log('scheme 1: ' + isLigth(scheme1));
console.log('scheme 2: ' + isLigth(scheme2));
console.log('scheme 3: ' + isLigth(scheme3));

