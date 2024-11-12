"use strict";(self.webpackChunk_kne_components_react_form_helper=self.webpackChunk_kne_components_react_form_helper||[]).push([[690],{5690:(e,n,r)=>{r.r(n),r.d(n,{default:()=>o,manifest:()=>t});const o={ReactFormHelper:{name:"react-form-helper",summary:"<p>\u6865\u63a5UI\u7ec4\u4ef6\u5e93\u7684Form\u8f93\u5165\u7ec4\u4ef6\u548c@kne/react-form</p>",description:"react-form\u7684\u8f85\u52a9\u5de5\u5177\u5305",packageName:"@kne/react-form-helper",api:"",example:{isFull:!0,className:"react_form_helper_eafaf",style:"",list:[{title:"\u57fa\u672c\u793a\u4f8b",description:"\u7b80\u5355\u7684form\u5230input\u7ec4\u4ef6\u7684\u7ed1\u5b9a",code:'const { createWithRemoteLoader } = remoteLoader;\nconst { hooks, widget, utils } = _ReactFormHelper;\nconst { default: Form, useSubmit } = _ReactForm;\nconst { Input: InputField, Button, Flex } = antd;\n\nconst { useDecorator } = hooks;\nconst { EnterSubmit, FormStore, ScrollToError } = widget;\n\nconst Input = (props) => {\n  const render = useDecorator(Object.assign({ placeholder: `\u8bf7\u8f93\u5165${props.label}` }, props));\n  return render(InputField);\n};\n\nconst SubmitButton = ({ type = \'primary\', realTime, realtime, disabled = false, ...props }) => {\n  const { isPass, isLoading, ...submitProps } = useSubmit(props);\n  if (typeof realTime === \'boolean\') {\n    console.error(`warning: realTime\u53c2\u6570\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528realtime\uff0c\u540e\u7eed\u7248\u672c\u53ef\u80fd\u56de\u5220\u9664realTime\u7684\u652f\u6301`);\n  }\n  return (<Button type={type} loading={isLoading}\n                  disabled={disabled || (realtime ? !isPass : false)} {...props} {...submitProps} />);\n};\n\nconst BaseExample = createWithRemoteLoader({\n  modules: [\'InfoPage\', \'Modal@useConfirmModal\']\n})(({ remoteModules }) => {\n  const [InfoPage, useConfirmModal] = remoteModules;\n  const modal = useConfirmModal();\n  const formInner = <Flex vertical gap="middle">\n    <Input name="name" label="\u540d\u79f0" rule="REQ LEN-0-10" />\n    <Input name="email" label="\u90ae\u7bb1" rule="REQ EMAIL" />\n    <SubmitButton>\u63d0\u4ea4</SubmitButton>\n  </Flex>;\n  return <InfoPage>\n    <InfoPage.Part title="\u7b80\u5355\u8868\u5355">\n      <Form onSubmit={(data) => {\n        modal({\n          type: \'info\', message: JSON.stringify(data, null, 2)\n        });\n      }}>\n        {formInner}\n      </Form>\n    </InfoPage.Part>\n    <InfoPage.Part title="\u81ea\u52a8\u6eda\u52a8\u5230\u9519\u8bef\u4f4d\u7f6e">\n      <Form onSubmit={(data) => {\n        modal({\n          type: \'info\', message: JSON.stringify(data, null, 2)\n        });\n      }} onError={(errors) => {\n        modal({\n          type: \'error\',\n          message: JSON.stringify(errors.map((item) => ({ label: item.label, errMsg: item.errMsg })), null, 2)\n        });\n      }}>\n        <ScrollToError />\n        {formInner}\n      </Form>\n    </InfoPage.Part>\n    <InfoPage.Part title="\u56de\u8f66\u63d0\u4ea4\u8868\u5355">\n      <Form onSubmit={(data) => {\n        modal({\n          type: \'info\', message: JSON.stringify(data, null, 2)\n        });\n      }} onError={(errors) => {\n        modal({\n          type: \'error\',\n          message: JSON.stringify(errors.map((item) => ({ label: item.label, errMsg: item.errMsg })), null, 2)\n        });\n      }}>\n        <EnterSubmit>\n          {formInner}\n        </EnterSubmit>\n      </Form>\n    </InfoPage.Part>\n    <InfoPage.Part title="\u8868\u5355\u7f13\u5b58">\n      <Form onSubmit={(data) => {\n        modal({\n          type: \'info\', message: JSON.stringify(data, null, 2)\n        });\n      }} onError={(errors) => {\n        modal({\n          type: \'error\',\n          message: JSON.stringify(errors.map((item) => ({ label: item.label, errMsg: item.errMsg })), null, 2)\n        });\n      }}>\n        <FormStore cache="test-form-cache" />\n        <EnterSubmit>\n          {formInner}\n        </EnterSubmit>\n      </Form>\n    </InfoPage.Part>\n  </InfoPage>;\n});\n\nrender(<BaseExample />);\n\n',scope:[{name:"_ReactFormHelper",packageName:"@kne/current-lib_react-form-helper",component:r(9854)},{name:"antd",packageName:"antd",component:r(55199)},{name:"_ReactForm",packageName:"@kne/react-form",component:r(89102)},{name:"remoteLoader",packageName:"@kne/remote-loader",component:r(13050)}]}]}}},t={name:"react-form-helper",version:"3.0.2","open-version":!0,"public-url":"/react-form-helper",modules:[{name:"react-form-helper",baseDir:"/home/runner/work/react-form-helper/react-form-helper",description:"react-form\u7684\u8f85\u52a9\u5de5\u5177\u5305",packageName:"@kne/react-form-helper"}]}}}]);
//# sourceMappingURL=690.f0cf75ec.chunk.js.map