// GENERATED by @edgedb/generate v0.5.3

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
export type $BlogPostλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "content": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, true>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
}>;
type $BlogPost = $.ObjectType<"default::BlogPost", $BlogPostλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $BlogPost = $.makeType<$BlogPost>(_.spec, "b4da05c8-1a1f-11ef-9988-dd4b879f2b73", _.syntax.literal);

const BlogPost: $.$expr_PathNode<$.TypeSet<$BlogPost, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($BlogPost, $.Cardinality.Many), null);



export { $BlogPost, BlogPost };

type __defaultExports = {
  "BlogPost": typeof BlogPost
};
const __defaultExports: __defaultExports = {
  "BlogPost": BlogPost
};
export default __defaultExports;