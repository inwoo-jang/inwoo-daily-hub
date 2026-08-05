import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import globals from 'globals'

/**
 * ESLint 설정 — 교안 10장 (252~262쪽)
 *
 * ESLint 는 "문법이 틀렸다"가 아니라 "이렇게 쓰면 나중에 문제가 된다"를 잡는다.
 * 빌드는 통과하는데 실행하면 터지는 코드가 여기서 걸린다.
 *
 * 형식(따옴표·줄바꿈·들여쓰기)은 Prettier 가 맡는다.
 * 마지막에 skipFormatting 을 두어, 형식 관련 규칙은 ESLint 가 관여하지 않게 한다.
 * 둘이 같은 것을 두고 다투면 저장할 때마다 코드가 앞뒤로 바뀐다.
 */
export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    // 내가 쓴 코드가 아닌 곳은 보지 않는다
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    name: 'app/language-options',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      /*
       * 안 쓰는 변수는 오류가 아니라 경고로 둔다.
       * 실습 코드에는 "이런 것도 있다"고 보여 주려고 선언만 해 둔 변수가 있는데,
       * 그것 때문에 빌드가 막히면 배우는 흐름이 끊긴다.
       * 다만 catch (error) 처럼 이름만 받고 안 쓰는 경우는 아예 넘긴다.
       */
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
    },
  },

  {
    /*
     * index.vue 는 폴더의 입구라는 뜻으로 쓰는 이름이다.
     * 폴더 이름이 곧 컴포넌트 이름 역할을 하므로 여기서는 한 단어여도 된다.
     * (vue/multi-word-component-names 는 <Button> 같은 이름이 HTML 기본 태그와
     *  부딪히는 것을 막으려는 규칙인데, index 는 그럴 일이 없다)
     */
    name: 'app/folder-entry-files',
    files: ['**/index.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  skipFormatting,
]
