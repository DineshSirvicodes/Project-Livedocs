"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/slate-history";
exports.ids = ["vendor-chunks/slate-history"];
exports.modules = {

/***/ "(ssr)/./node_modules/slate-history/dist/index.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/slate-history/dist/index.es.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HISTORY: () => (/* binding */ HISTORY),\n/* harmony export */   History: () => (/* binding */ History),\n/* harmony export */   HistoryEditor: () => (/* binding */ HistoryEditor),\n/* harmony export */   MERGING: () => (/* binding */ MERGING),\n/* harmony export */   SAVING: () => (/* binding */ SAVING),\n/* harmony export */   withHistory: () => (/* binding */ withHistory)\n/* harmony export */ });\n/* harmony import */ var is_plain_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-plain-object */ \"(ssr)/./node_modules/is-plain-object/dist/is-plain-object.mjs\");\n/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slate */ \"(ssr)/./node_modules/slate/dist/index.es.js\");\n\n\n\n// eslint-disable-next-line no-redeclare\nvar History = {\n  /**\n   * Check if a value is a `History` object.\n   */\n  isHistory(value) {\n    return (0,is_plain_object__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value) && Array.isArray(value.redos) && Array.isArray(value.undos) && (value.redos.length === 0 || slate__WEBPACK_IMPORTED_MODULE_1__.Operation.isOperationList(value.redos[0].operations)) && (value.undos.length === 0 || slate__WEBPACK_IMPORTED_MODULE_1__.Operation.isOperationList(value.undos[0].operations));\n  }\n};\n\n/**\n * Weakmaps for attaching state to the editor.\n */\nvar HISTORY = new WeakMap();\nvar SAVING = new WeakMap();\nvar MERGING = new WeakMap();\n// eslint-disable-next-line no-redeclare\nvar HistoryEditor = {\n  /**\n   * Check if a value is a `HistoryEditor` object.\n   */\n  isHistoryEditor(value) {\n    return History.isHistory(value.history) && slate__WEBPACK_IMPORTED_MODULE_1__.Editor.isEditor(value);\n  },\n  /**\n   * Get the merge flag's current value.\n   */\n  isMerging(editor) {\n    return MERGING.get(editor);\n  },\n  /**\n   * Get the saving flag's current value.\n   */\n  isSaving(editor) {\n    return SAVING.get(editor);\n  },\n  /**\n   * Redo to the previous saved state.\n   */\n  redo(editor) {\n    editor.redo();\n  },\n  /**\n   * Undo to the previous saved state.\n   */\n  undo(editor) {\n    editor.undo();\n  },\n  /**\n   * Apply a series of changes inside a synchronous `fn`, without merging any of\n   * the new operations into previous save point in the history.\n   */\n  withoutMerging(editor, fn) {\n    var prev = HistoryEditor.isMerging(editor);\n    MERGING.set(editor, false);\n    fn();\n    MERGING.set(editor, prev);\n  },\n  /**\n   * Apply a series of changes inside a synchronous `fn`, without saving any of\n   * their operations into the history.\n   */\n  withoutSaving(editor, fn) {\n    var prev = HistoryEditor.isSaving(editor);\n    SAVING.set(editor, false);\n    fn();\n    SAVING.set(editor, prev);\n  }\n};\n\n/**\n * The `withHistory` plugin keeps track of the operation history of a Slate\n * editor as operations are applied to it, using undo and redo stacks.\n *\n * If you are using TypeScript, you must extend Slate's CustomTypes to use\n * this plugin.\n *\n * See https://docs.slatejs.org/concepts/11-typescript to learn how.\n */\nvar withHistory = editor => {\n  var e = editor;\n  var {\n    apply\n  } = e;\n  e.history = {\n    undos: [],\n    redos: []\n  };\n  e.redo = () => {\n    var {\n      history\n    } = e;\n    var {\n      redos\n    } = history;\n    if (redos.length > 0) {\n      var batch = redos[redos.length - 1];\n      if (batch.selectionBefore) {\n        slate__WEBPACK_IMPORTED_MODULE_1__.Transforms.setSelection(e, batch.selectionBefore);\n      }\n      HistoryEditor.withoutSaving(e, () => {\n        slate__WEBPACK_IMPORTED_MODULE_1__.Editor.withoutNormalizing(e, () => {\n          for (var op of batch.operations) {\n            e.apply(op);\n          }\n        });\n      });\n      history.redos.pop();\n      e.writeHistory('undos', batch);\n    }\n  };\n  e.undo = () => {\n    var {\n      history\n    } = e;\n    var {\n      undos\n    } = history;\n    if (undos.length > 0) {\n      var batch = undos[undos.length - 1];\n      HistoryEditor.withoutSaving(e, () => {\n        slate__WEBPACK_IMPORTED_MODULE_1__.Editor.withoutNormalizing(e, () => {\n          var inverseOps = batch.operations.map(slate__WEBPACK_IMPORTED_MODULE_1__.Operation.inverse).reverse();\n          for (var op of inverseOps) {\n            e.apply(op);\n          }\n          if (batch.selectionBefore) {\n            slate__WEBPACK_IMPORTED_MODULE_1__.Transforms.setSelection(e, batch.selectionBefore);\n          }\n        });\n      });\n      e.writeHistory('redos', batch);\n      history.undos.pop();\n    }\n  };\n  e.apply = op => {\n    var {\n      operations,\n      history\n    } = e;\n    var {\n      undos\n    } = history;\n    var lastBatch = undos[undos.length - 1];\n    var lastOp = lastBatch && lastBatch.operations[lastBatch.operations.length - 1];\n    var save = HistoryEditor.isSaving(e);\n    var merge = HistoryEditor.isMerging(e);\n    if (save == null) {\n      save = shouldSave(op);\n    }\n    if (save) {\n      if (merge == null) {\n        if (lastBatch == null) {\n          merge = false;\n        } else if (operations.length !== 0) {\n          merge = true;\n        } else {\n          merge = shouldMerge(op, lastOp);\n        }\n      }\n      if (lastBatch && merge) {\n        lastBatch.operations.push(op);\n      } else {\n        var batch = {\n          operations: [op],\n          selectionBefore: e.selection\n        };\n        e.writeHistory('undos', batch);\n      }\n      while (undos.length > 100) {\n        undos.shift();\n      }\n      history.redos = [];\n    }\n    apply(op);\n  };\n  e.writeHistory = (stack, batch) => {\n    e.history[stack].push(batch);\n  };\n  return e;\n};\n/**\n * Check whether to merge an operation into the previous operation.\n */\nvar shouldMerge = (op, prev) => {\n  if (prev && op.type === 'insert_text' && prev.type === 'insert_text' && op.offset === prev.offset + prev.text.length && slate__WEBPACK_IMPORTED_MODULE_1__.Path.equals(op.path, prev.path)) {\n    return true;\n  }\n  if (prev && op.type === 'remove_text' && prev.type === 'remove_text' && op.offset + op.text.length === prev.offset && slate__WEBPACK_IMPORTED_MODULE_1__.Path.equals(op.path, prev.path)) {\n    return true;\n  }\n  return false;\n};\n/**\n * Check whether an operation needs to be saved to the history.\n */\nvar shouldSave = (op, prev) => {\n  if (op.type === 'set_selection') {\n    return false;\n  }\n  return true;\n};\n\n\n//# sourceMappingURL=index.es.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2xhdGUtaGlzdG9yeS9kaXN0L2luZGV4LmVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWdEO0FBQ1k7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsOERBQWEsb0dBQW9HLDRDQUFTLDZFQUE2RSw0Q0FBUztBQUMzTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyx5Q0FBTTtBQUNyRCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkNBQVU7QUFDbEI7QUFDQTtBQUNBLFFBQVEseUNBQU07QUFDZDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsUUFBUSx5Q0FBTTtBQUNkLGdEQUFnRCw0Q0FBUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQVU7QUFDdEI7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwSEFBMEgsdUNBQUk7QUFDOUg7QUFDQTtBQUNBLHdIQUF3SCx1Q0FBSTtBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFeUU7QUFDekUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlZG9jcy8uL25vZGVfbW9kdWxlcy9zbGF0ZS1oaXN0b3J5L2Rpc3QvaW5kZXguZXMuanM/ZGE2NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYWluT2JqZWN0IH0gZnJvbSAnaXMtcGxhaW4tb2JqZWN0JztcbmltcG9ydCB7IE9wZXJhdGlvbiwgRWRpdG9yLCBUcmFuc2Zvcm1zLCBQYXRoIH0gZnJvbSAnc2xhdGUnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG52YXIgSGlzdG9yeSA9IHtcbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdmFsdWUgaXMgYSBgSGlzdG9yeWAgb2JqZWN0LlxuICAgKi9cbiAgaXNIaXN0b3J5KHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzUGxhaW5PYmplY3QodmFsdWUpICYmIEFycmF5LmlzQXJyYXkodmFsdWUucmVkb3MpICYmIEFycmF5LmlzQXJyYXkodmFsdWUudW5kb3MpICYmICh2YWx1ZS5yZWRvcy5sZW5ndGggPT09IDAgfHwgT3BlcmF0aW9uLmlzT3BlcmF0aW9uTGlzdCh2YWx1ZS5yZWRvc1swXS5vcGVyYXRpb25zKSkgJiYgKHZhbHVlLnVuZG9zLmxlbmd0aCA9PT0gMCB8fCBPcGVyYXRpb24uaXNPcGVyYXRpb25MaXN0KHZhbHVlLnVuZG9zWzBdLm9wZXJhdGlvbnMpKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXZWFrbWFwcyBmb3IgYXR0YWNoaW5nIHN0YXRlIHRvIHRoZSBlZGl0b3IuXG4gKi9cbnZhciBISVNUT1JZID0gbmV3IFdlYWtNYXAoKTtcbnZhciBTQVZJTkcgPSBuZXcgV2Vha01hcCgpO1xudmFyIE1FUkdJTkcgPSBuZXcgV2Vha01hcCgpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlZGVjbGFyZVxudmFyIEhpc3RvcnlFZGl0b3IgPSB7XG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHZhbHVlIGlzIGEgYEhpc3RvcnlFZGl0b3JgIG9iamVjdC5cbiAgICovXG4gIGlzSGlzdG9yeUVkaXRvcih2YWx1ZSkge1xuICAgIHJldHVybiBIaXN0b3J5LmlzSGlzdG9yeSh2YWx1ZS5oaXN0b3J5KSAmJiBFZGl0b3IuaXNFZGl0b3IodmFsdWUpO1xuICB9LFxuICAvKipcbiAgICogR2V0IHRoZSBtZXJnZSBmbGFnJ3MgY3VycmVudCB2YWx1ZS5cbiAgICovXG4gIGlzTWVyZ2luZyhlZGl0b3IpIHtcbiAgICByZXR1cm4gTUVSR0lORy5nZXQoZWRpdG9yKTtcbiAgfSxcbiAgLyoqXG4gICAqIEdldCB0aGUgc2F2aW5nIGZsYWcncyBjdXJyZW50IHZhbHVlLlxuICAgKi9cbiAgaXNTYXZpbmcoZWRpdG9yKSB7XG4gICAgcmV0dXJuIFNBVklORy5nZXQoZWRpdG9yKTtcbiAgfSxcbiAgLyoqXG4gICAqIFJlZG8gdG8gdGhlIHByZXZpb3VzIHNhdmVkIHN0YXRlLlxuICAgKi9cbiAgcmVkbyhlZGl0b3IpIHtcbiAgICBlZGl0b3IucmVkbygpO1xuICB9LFxuICAvKipcbiAgICogVW5kbyB0byB0aGUgcHJldmlvdXMgc2F2ZWQgc3RhdGUuXG4gICAqL1xuICB1bmRvKGVkaXRvcikge1xuICAgIGVkaXRvci51bmRvKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBBcHBseSBhIHNlcmllcyBvZiBjaGFuZ2VzIGluc2lkZSBhIHN5bmNocm9ub3VzIGBmbmAsIHdpdGhvdXQgbWVyZ2luZyBhbnkgb2ZcbiAgICogdGhlIG5ldyBvcGVyYXRpb25zIGludG8gcHJldmlvdXMgc2F2ZSBwb2ludCBpbiB0aGUgaGlzdG9yeS5cbiAgICovXG4gIHdpdGhvdXRNZXJnaW5nKGVkaXRvciwgZm4pIHtcbiAgICB2YXIgcHJldiA9IEhpc3RvcnlFZGl0b3IuaXNNZXJnaW5nKGVkaXRvcik7XG4gICAgTUVSR0lORy5zZXQoZWRpdG9yLCBmYWxzZSk7XG4gICAgZm4oKTtcbiAgICBNRVJHSU5HLnNldChlZGl0b3IsIHByZXYpO1xuICB9LFxuICAvKipcbiAgICogQXBwbHkgYSBzZXJpZXMgb2YgY2hhbmdlcyBpbnNpZGUgYSBzeW5jaHJvbm91cyBgZm5gLCB3aXRob3V0IHNhdmluZyBhbnkgb2ZcbiAgICogdGhlaXIgb3BlcmF0aW9ucyBpbnRvIHRoZSBoaXN0b3J5LlxuICAgKi9cbiAgd2l0aG91dFNhdmluZyhlZGl0b3IsIGZuKSB7XG4gICAgdmFyIHByZXYgPSBIaXN0b3J5RWRpdG9yLmlzU2F2aW5nKGVkaXRvcik7XG4gICAgU0FWSU5HLnNldChlZGl0b3IsIGZhbHNlKTtcbiAgICBmbigpO1xuICAgIFNBVklORy5zZXQoZWRpdG9yLCBwcmV2KTtcbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgYHdpdGhIaXN0b3J5YCBwbHVnaW4ga2VlcHMgdHJhY2sgb2YgdGhlIG9wZXJhdGlvbiBoaXN0b3J5IG9mIGEgU2xhdGVcbiAqIGVkaXRvciBhcyBvcGVyYXRpb25zIGFyZSBhcHBsaWVkIHRvIGl0LCB1c2luZyB1bmRvIGFuZCByZWRvIHN0YWNrcy5cbiAqXG4gKiBJZiB5b3UgYXJlIHVzaW5nIFR5cGVTY3JpcHQsIHlvdSBtdXN0IGV4dGVuZCBTbGF0ZSdzIEN1c3RvbVR5cGVzIHRvIHVzZVxuICogdGhpcyBwbHVnaW4uXG4gKlxuICogU2VlIGh0dHBzOi8vZG9jcy5zbGF0ZWpzLm9yZy9jb25jZXB0cy8xMS10eXBlc2NyaXB0IHRvIGxlYXJuIGhvdy5cbiAqL1xudmFyIHdpdGhIaXN0b3J5ID0gZWRpdG9yID0+IHtcbiAgdmFyIGUgPSBlZGl0b3I7XG4gIHZhciB7XG4gICAgYXBwbHlcbiAgfSA9IGU7XG4gIGUuaGlzdG9yeSA9IHtcbiAgICB1bmRvczogW10sXG4gICAgcmVkb3M6IFtdXG4gIH07XG4gIGUucmVkbyA9ICgpID0+IHtcbiAgICB2YXIge1xuICAgICAgaGlzdG9yeVxuICAgIH0gPSBlO1xuICAgIHZhciB7XG4gICAgICByZWRvc1xuICAgIH0gPSBoaXN0b3J5O1xuICAgIGlmIChyZWRvcy5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgYmF0Y2ggPSByZWRvc1tyZWRvcy5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChiYXRjaC5zZWxlY3Rpb25CZWZvcmUpIHtcbiAgICAgICAgVHJhbnNmb3Jtcy5zZXRTZWxlY3Rpb24oZSwgYmF0Y2guc2VsZWN0aW9uQmVmb3JlKTtcbiAgICAgIH1cbiAgICAgIEhpc3RvcnlFZGl0b3Iud2l0aG91dFNhdmluZyhlLCAoKSA9PiB7XG4gICAgICAgIEVkaXRvci53aXRob3V0Tm9ybWFsaXppbmcoZSwgKCkgPT4ge1xuICAgICAgICAgIGZvciAodmFyIG9wIG9mIGJhdGNoLm9wZXJhdGlvbnMpIHtcbiAgICAgICAgICAgIGUuYXBwbHkob3ApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGhpc3RvcnkucmVkb3MucG9wKCk7XG4gICAgICBlLndyaXRlSGlzdG9yeSgndW5kb3MnLCBiYXRjaCk7XG4gICAgfVxuICB9O1xuICBlLnVuZG8gPSAoKSA9PiB7XG4gICAgdmFyIHtcbiAgICAgIGhpc3RvcnlcbiAgICB9ID0gZTtcbiAgICB2YXIge1xuICAgICAgdW5kb3NcbiAgICB9ID0gaGlzdG9yeTtcbiAgICBpZiAodW5kb3MubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGJhdGNoID0gdW5kb3NbdW5kb3MubGVuZ3RoIC0gMV07XG4gICAgICBIaXN0b3J5RWRpdG9yLndpdGhvdXRTYXZpbmcoZSwgKCkgPT4ge1xuICAgICAgICBFZGl0b3Iud2l0aG91dE5vcm1hbGl6aW5nKGUsICgpID0+IHtcbiAgICAgICAgICB2YXIgaW52ZXJzZU9wcyA9IGJhdGNoLm9wZXJhdGlvbnMubWFwKE9wZXJhdGlvbi5pbnZlcnNlKS5yZXZlcnNlKCk7XG4gICAgICAgICAgZm9yICh2YXIgb3Agb2YgaW52ZXJzZU9wcykge1xuICAgICAgICAgICAgZS5hcHBseShvcCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChiYXRjaC5zZWxlY3Rpb25CZWZvcmUpIHtcbiAgICAgICAgICAgIFRyYW5zZm9ybXMuc2V0U2VsZWN0aW9uKGUsIGJhdGNoLnNlbGVjdGlvbkJlZm9yZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZS53cml0ZUhpc3RvcnkoJ3JlZG9zJywgYmF0Y2gpO1xuICAgICAgaGlzdG9yeS51bmRvcy5wb3AoKTtcbiAgICB9XG4gIH07XG4gIGUuYXBwbHkgPSBvcCA9PiB7XG4gICAgdmFyIHtcbiAgICAgIG9wZXJhdGlvbnMsXG4gICAgICBoaXN0b3J5XG4gICAgfSA9IGU7XG4gICAgdmFyIHtcbiAgICAgIHVuZG9zXG4gICAgfSA9IGhpc3Rvcnk7XG4gICAgdmFyIGxhc3RCYXRjaCA9IHVuZG9zW3VuZG9zLmxlbmd0aCAtIDFdO1xuICAgIHZhciBsYXN0T3AgPSBsYXN0QmF0Y2ggJiYgbGFzdEJhdGNoLm9wZXJhdGlvbnNbbGFzdEJhdGNoLm9wZXJhdGlvbnMubGVuZ3RoIC0gMV07XG4gICAgdmFyIHNhdmUgPSBIaXN0b3J5RWRpdG9yLmlzU2F2aW5nKGUpO1xuICAgIHZhciBtZXJnZSA9IEhpc3RvcnlFZGl0b3IuaXNNZXJnaW5nKGUpO1xuICAgIGlmIChzYXZlID09IG51bGwpIHtcbiAgICAgIHNhdmUgPSBzaG91bGRTYXZlKG9wKTtcbiAgICB9XG4gICAgaWYgKHNhdmUpIHtcbiAgICAgIGlmIChtZXJnZSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChsYXN0QmF0Y2ggPT0gbnVsbCkge1xuICAgICAgICAgIG1lcmdlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAob3BlcmF0aW9ucy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBtZXJnZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVyZ2UgPSBzaG91bGRNZXJnZShvcCwgbGFzdE9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGxhc3RCYXRjaCAmJiBtZXJnZSkge1xuICAgICAgICBsYXN0QmF0Y2gub3BlcmF0aW9ucy5wdXNoKG9wKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBiYXRjaCA9IHtcbiAgICAgICAgICBvcGVyYXRpb25zOiBbb3BdLFxuICAgICAgICAgIHNlbGVjdGlvbkJlZm9yZTogZS5zZWxlY3Rpb25cbiAgICAgICAgfTtcbiAgICAgICAgZS53cml0ZUhpc3RvcnkoJ3VuZG9zJywgYmF0Y2gpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHVuZG9zLmxlbmd0aCA+IDEwMCkge1xuICAgICAgICB1bmRvcy5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgaGlzdG9yeS5yZWRvcyA9IFtdO1xuICAgIH1cbiAgICBhcHBseShvcCk7XG4gIH07XG4gIGUud3JpdGVIaXN0b3J5ID0gKHN0YWNrLCBiYXRjaCkgPT4ge1xuICAgIGUuaGlzdG9yeVtzdGFja10ucHVzaChiYXRjaCk7XG4gIH07XG4gIHJldHVybiBlO1xufTtcbi8qKlxuICogQ2hlY2sgd2hldGhlciB0byBtZXJnZSBhbiBvcGVyYXRpb24gaW50byB0aGUgcHJldmlvdXMgb3BlcmF0aW9uLlxuICovXG52YXIgc2hvdWxkTWVyZ2UgPSAob3AsIHByZXYpID0+IHtcbiAgaWYgKHByZXYgJiYgb3AudHlwZSA9PT0gJ2luc2VydF90ZXh0JyAmJiBwcmV2LnR5cGUgPT09ICdpbnNlcnRfdGV4dCcgJiYgb3Aub2Zmc2V0ID09PSBwcmV2Lm9mZnNldCArIHByZXYudGV4dC5sZW5ndGggJiYgUGF0aC5lcXVhbHMob3AucGF0aCwgcHJldi5wYXRoKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChwcmV2ICYmIG9wLnR5cGUgPT09ICdyZW1vdmVfdGV4dCcgJiYgcHJldi50eXBlID09PSAncmVtb3ZlX3RleHQnICYmIG9wLm9mZnNldCArIG9wLnRleHQubGVuZ3RoID09PSBwcmV2Lm9mZnNldCAmJiBQYXRoLmVxdWFscyhvcC5wYXRoLCBwcmV2LnBhdGgpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBvcGVyYXRpb24gbmVlZHMgdG8gYmUgc2F2ZWQgdG8gdGhlIGhpc3RvcnkuXG4gKi9cbnZhciBzaG91bGRTYXZlID0gKG9wLCBwcmV2KSA9PiB7XG4gIGlmIChvcC50eXBlID09PSAnc2V0X3NlbGVjdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgeyBISVNUT1JZLCBIaXN0b3J5LCBIaXN0b3J5RWRpdG9yLCBNRVJHSU5HLCBTQVZJTkcsIHdpdGhIaXN0b3J5IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5lcy5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/slate-history/dist/index.es.js\n");

/***/ })

};
;