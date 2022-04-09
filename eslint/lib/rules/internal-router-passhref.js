const NodeAttributes = require('../utils/node-attributes.js');

module.exports = {
  create: function (context) {
    let linkImport = null;

    return {
      ImportDeclaration(node) {
        if (node.source.value === '~/components/common/InternalLink') {
          linkImport = node.specifiers[0].local.name;
        }
      },

      JSXOpeningElement(node) {
        if (node.name.name !== linkImport) {
          return;
        }

        const attributes = new NodeAttributes(node);
        const children = node.parent.children;

        if (
          !attributes.hasAny() ||
          !attributes.has('href') ||
          !children.some(attr => attr.type === 'JSXElement')
        ) {
          return;
        }

        const hasPassHref =
          attributes.has('passHref') &&
          (typeof attributes.value('passHref') === 'undefined' ||
            attributes.value('passHref') === true);

        const hasAnchorChild = children.some(
          attr => attr.type === 'JSXElement' && attr.openingElement.name.name === 'a'
        );

        if (!hasAnchorChild && !hasPassHref) {
          return context.report({
            node,
            message: `passHref 속성${
              attributes.value('passHref') !== true ? '을 true로 설정해주세요' : '이 없어요'
            }. 다음 문서를 확인해보세요: https://nextjs.org/docs/messages/link-passhref`,
          });
        }
      },
    };
  },
};
