/* eslint-disable no-magic-numbers */
const kIndent = 2

const kBaseBlankLineBetweenStatementsConfig = [
  { blankLine: 'always', prev: 'block-like', next: '*' },
  { blankLine: 'always', prev: 'break', next: '*' },
  { blankLine: 'always', prev: ['case', 'default'], next: '*' },
  { blankLine: 'always', prev: '*', next: 'class' },
  { blankLine: 'always', prev: '*', next: 'default' },
  { blankLine: 'always', prev: '*', next: 'do' },
  { blankLine: 'always', prev: '*', next: 'for' },
  { blankLine: 'always', prev: '*', next: 'function' },
  { blankLine: 'always', prev: '*', next: 'if' },
  { blankLine: 'always', prev: '*', next: 'iife' },
  { blankLine: 'always', prev: '*', next: 'switch' },
  { blankLine: 'always', prev: 'case', next: 'case' },
  { blankLine: 'always', prev: '*', next: 'try' },
  { blankLine: 'always', prev: '*', next: 'while' }
]

const kBaseRules = {
  'accessor-pairs': 'error',
  'array-callback-return': ['error', { checkForEach: true }],
  curly: ['error', 'all'],
  'comma-spacing': ['error', { before: false, after: true }],
  'consistent-return': 'error',
  'consistent-this': ['error', '$this'],
  'default-case': 'error',
  'default-param-last': 'error',
  'dot-notation': 'error',
  'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
  'grouped-accessor-pairs': ['error', 'getBeforeSet'],
  'guard-for-in': 'error',
  'import/order': [
    'error',
    {
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      },
      'newlines-between': 'never'
    }
  ],
  'import/first': 'error',
  'import/no-mutable-exports': 'error',
  'import/no-unresolved': 'off',

  'max-depth': ['error', { max: 5 }],
  'no-alert': 'error',
  'no-array-constructor': 'error',
  'no-await-in-loop': 'error',
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-constructor-return': 'error',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-duplicate-imports': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-extra-bind': 'error',
  'no-floating-decimal': 'error',
  'no-implied-eval': 'error',
  'no-invalid-this': 'error',
  'no-lone-blocks': 'error',
  'no-lonely-if': 'error',
  'no-loop-func': 'error',
  'no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],
  'no-mixed-operators': 'error',
  'no-multi-assign': 'error',
  'no-multi-str': 'error',
  'no-nested-ternary': 'error',
  'no-new': 'error',
  'no-param-reassign': ['error', { props: false }],
  'no-promise-executor-return': 'error',
  'no-return-assign': ['error', 'always'],
  'no-return-await': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-shadow': 'error',
  'no-throw-literal': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unneeded-ternary': 'error',
  'no-unreachable-loop': 'error',
  'no-unused-expressions': 'error',
  'no-unused-private-class-members': 'error',
  'no-unused-vars': ['error', { varsIgnorePattern: 'exhaustiveCheck' }],
  'no-use-before-define': 'error',
  'no-useless-call': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-concat': 'error',
  'no-useless-constructor': 'error',
  'no-useless-rename': 'error',
  'no-useless-return': 'error',
  'no-var': 'error',
  'no-void': 'error',
  'object-shorthand': 'error',
  'padding-line-between-statements': ['error', ...kBaseBlankLineBetweenStatementsConfig],
  'prefer-arrow-callback': 'error',
  'prefer-const': 'error',
  'prefer-numeric-literals': 'error',
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  quotes: ['error', 'single', { avoidEscape: true }],
  'require-await': 'error',
  'require-unicode-regexp': 'error',
  'spaced-comment': ['error', 'always'],
  'symbol-description': 'error',
  yoda: 'error'
}

function fromBaseRule(rule, options) {
  return {
    [rule]: 'off',
    [`@typescript-eslint/${rule}`]: options || kBaseRules[rule] || 'error'
  }
}

const kNamingConventions = [
  {
    selector: 'default',
    format: ['camelCase'],
    leadingUnderscore: 'forbid'
  },
  {
    selector: 'variable',
    format: ['camelCase']
  },
  {
    selector: 'parameter',
    format: ['camelCase'],
    leadingUnderscore: 'allow'
  },
  {
    selector: 'objectLiteralProperty',
    format: ['camelCase', 'snake_case']
  },
  {
    selector: ['property', 'objectLiteralProperty'],
    format: ['camelCase', 'snake_case', 'PascalCase'],
    leadingUnderscore: 'allow',
    filter: '^(_id|_rev|_deleted|_removed|attached_to|content_type|space_key)$'
  },
  {
    selector: 'memberLike',
    modifiers: ['private'],
    format: ['camelCase']
  },
  {
    selector: 'typeLike',
    format: ['PascalCase']
  },
  {
    selector: 'enum',
    format: ['PascalCase'],
    prefix: ['E']
  }
]

/*
  NOTE: Whenever you see a call to fromBaseRule(), it's because
  the base rule must be disabled as it can report incorrect errors.
*/
const kTypeScriptRules = {
  '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description',
      'ts-nocheck': true,
      'ts-check': false,
      minimumDescriptionLength: 7
    }
  ],
  ...fromBaseRule('brace-style', ['error', '1tbs']),
  '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
  ...fromBaseRule('comma-dangle'),
  ...fromBaseRule('comma-spacing'),
  '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
  '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/consistent-type-exports': [
    'error',
    { fixMixedExportsWithInlineTypeSpecifier: true }
  ],
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: true
    }
  ],
  ...fromBaseRule('default-param-last'),
  ...fromBaseRule('dot-notation'),
  '@typescript-eslint/explicit-function-return-type': ['error'],
  '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
  '@typescript-eslint/explicit-module-boundary-types': ['error'],
  ...fromBaseRule('func-call-spacing', ['error', 'never']),
  ...fromBaseRule('keyword-spacing', ['error', { before: true, after: true }]),
  ...fromBaseRule('lines-between-class-members', [
    'error',
    'always',
    {
      exceptAfterOverload: true,
      exceptAfterSingleLine: true
    }
  ]),
  '@typescript-eslint/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'none'
      },
      singleline: {
        delimiter: 'comma',
        requireLast: false
      }
    }
  ],
  // Use the default: https://typescript-eslint.io/rules/member-ordering#default-configuration
  '@typescript-eslint/member-ordering': 'off',
  '@typescript-eslint/method-signature-style': ['error', 'property'],
  // See https://typescript-eslint.io/rules/naming-convention
  '@typescript-eslint/naming-convention': ['error', ...kNamingConventions],
  '@typescript-eslint/no-base-to-string': ['error'],
  '@typescript-eslint/no-confusing-non-null-assertion': 'error',
  '@typescript-eslint/no-confusing-void-expression': 'error',
  ...fromBaseRule('no-dupe-class-members'),
  ...fromBaseRule('no-duplicate-imports'),
  '@typescript-eslint/no-dynamic-delete': 'error',
  ...fromBaseRule('no-extra-parens', ['off']),
  '@typescript-eslint/no-extraneous-class': ['error'],
  ...fromBaseRule('no-invalid-this'),
  '@typescript-eslint/no-invalid-void-type': ['error'],
  ...fromBaseRule('no-loop-func'),
  ...fromBaseRule('no-magic-numbers', [
    'error',
    {
      // eslint-disable-next-line no-magic-numbers
      ignore: [-1, 0, 1],
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true
    }
  ]),
  '@typescript-eslint/no-meaningless-void-operator': [
    'error',
    {
      checkNever: false
    }
  ],
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksConditionals: true,
      checksVoidReturn: true
    }
  ],
  '@typescript-eslint/no-parameter-properties': ['error'],
  ...fromBaseRule('no-redeclare'),
  '@typescript-eslint/no-require-imports': 'error',
  ...fromBaseRule('no-shadow', ['error', { ignoreTypeValueShadow: true }]),
  '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
  ...fromBaseRule('no-unused-expressions', ['error', { allowTernary: true }]),
  ...fromBaseRule('no-use-before-define'),
  ...fromBaseRule('no-useless-constructor'),
  '@typescript-eslint/non-nullable-type-assertion-style': 'error',
  ...fromBaseRule('padding-line-between-statements', [
    'error',
    ...kBaseBlankLineBetweenStatementsConfig,
    {
      blankLine: 'always',
      prev: '*',
      next: 'interface'
    },
    {
      blankLine: 'always',
      prev: '*',
      next: ['import', 'type']
    },
    {
      blankLine: 'always',
      prev: ['import', 'type'],
      next: '*'
    },
    {
      blankLine: 'any',
      prev: 'type',
      next: 'type'
    },
    {
      blankLine: 'any',
      prev: 'import',
      next: 'import'
    }
  ]),
  '@typescript-eslint/prefer-for-of': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/prefer-includes': 'error',
  '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: true }],
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  '@typescript-eslint/prefer-readonly': 'error',
  '@typescript-eslint/prefer-reduce-type-parameter': 'error',
  '@typescript-eslint/prefer-regexp-exec': 'error',
  '@typescript-eslint/prefer-return-this-type': 'error',
  '@typescript-eslint/prefer-string-starts-ends-with': 'error',
  '@typescript-eslint/promise-function-async': 'error',
  ...fromBaseRule('quotes'),
  '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
  '@typescript-eslint/restrict-template-expressions': [
    'error',
    {
      allowNumber: true,
      allowBoolean: true,
      allowAny: false,
      allowNullish: true,
      allowRegExp: false
    }
  ],
  ...fromBaseRule('return-await', ['error', 'in-try-catch']),
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/unbound-method': 'error',
  '@typescript-eslint/unified-signatures': 'error'
}

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier-vue/recommended'
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    allowAutomaticSingleRunInference: true,
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue']
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.ts'] }
    }
  },

  rules: kBaseRules,

  overrides: [
    // TypeScript
    {
      files: ['*.ts', '*.d.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: { ...kTypeScriptRules }
    },

    // Vue
    {
      files: ['*.vue'],
      plugins: ['vue'],
      extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: {
          // Script parser for `<script>`
          js: 'espree',

          // Script parser for `<script lang="ts">`
          ts: '@typescript-eslint/parser',

          // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
          // and vue interpolations (e.g. `{{variable}}`).
          // If not specified, the parser determined by `<script lang ="...">` is used.
          '<template>': '@typescript-eslint/parser'
        },
        // @typescript-eslint needs this
        project: ['./tsconfig.json']
      },
      settings: {
        'prettier-vue': {
          SFCBlocks: {
            template: false,
            script: true,
            style: true,

            customBlocks: {
              docs: { lang: 'markdown' },
              config: { lang: 'json' },
              module: { lang: 'ts' },
              comments: false
            }
          },

          usePrettierrc: true,
          fileInfoOptions: {
            ignorePath: '.testignore',
            withNodeModules: false
          }
        }
      },
      rules: {
        ...kTypeScriptRules,

        // Override naming rules for object literal properties so that
        // we don't get errors when returning components from setup().
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'objectLiteralProperty',
            format: ['camelCase', 'snake_case', 'PascalCase']
          },
          ...kNamingConventions
        ],

        'vue/block-spacing': 'error',
        'vue/component-tags-order': [
          'error',
          {
            order: ['template', 'script', 'style']
          }
        ],
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          {
            registeredComponentsOnly: true,
            ignores: []
          }
        ],
        'vue/custom-event-name-casing': 'off',
        'vue/html-closing-bracket-newline': [
          'error',
          {
            singleline: 'never',
            multiline: 'always'
          }
        ],
        'vue/html-indent': ['error', kIndent],
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 1
            },
            multiline: {
              max: 1
            }
          }
        ],
        'vue/no-deprecated-destroyed-lifecycle': 'off',
        'vue/no-deprecated-events-api': 'off',
        'vue/no-deprecated-slot-attribute': 'off',
        'vue/no-deprecated-v-on-native-modifier': 'off',
        'vue/no-parsing-error': [
          'error',
          {
            'x-invalid-end-tag': false
          }
        ]
      },
      globals: {
        defineProps: true,
        defineEmits: true,
        defineExpose: true,
        useMeta: true
      }
    },

    // TypeScript definitions
    {
      files: ['*.d.ts'],
      rules: { 'spaced-comment': 'off' }
    },

    // Vite env files
    {
      files: ['env.d.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['typeProperty'],
            format: ['UPPER_CASE'],
            filter: '^VITE_'
          },

          ...kNamingConventions
        ]
      }
    },

    // Plain js
    {
      files: ['*.js', '*.mjs'],
      rules: { '@typescript-eslint/no-var-requires': 'off' }
    },

    // Cypress
    {
      files: ['**/cypress/**/*.js'],
      env: {
        mocha: true
      },
      globals: {
        expect: true,
        Cypress: true,
        cy: true
      }
    },

    // Files that will run in the browser
    {
      files: ['*.stories.js', '*.vue'],
      env: {
        browser: true
      }
    }
  ]
}
