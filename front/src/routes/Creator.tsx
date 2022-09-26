import React, { useState } from "react";

// 최종적으로 firebase-firestore에 저장될 Object의 자료형
type TFormData = {
  title: string;
  description: string;
  author: string;
  image: string;
  types: Array<TType>;
  sets: Array<TQuestionSet>;
};

type TType = {
  name: string;
  image: string;
  description: string;
};

type TQuestionSet = {
  question: string;
  options: Array<TOption>;
};

type TOption = {
  name: string;
  results: Array<number>;
};

// 해당 컴포넌트(Creator.tsx)에서 사용하는 State의 자료형
type TGeneralInfo = {
  title : string;
  description : string;
  author : string;
  image : string;
}

function Creator() {
  // -------------------- States
  // ---------------------------
  // 해당 "테스트"의 개요를 이루는 정보 (title, description, author, image)
  const [generalInfo, setGeneralInfo] = useState<TGeneralInfo>({
    title : '',
    description : '',
    author : '사용자 계정이 들어갈 곳',
    image : '',
  });

  // 해당 "테스트"가 낼 수 있는 모든 유형(type)의 집합 -- (배열)
  const [types, setTypes] = useState<Array<TType>>([
    {
      name : '',
      image : '',
      description : '',
    }, {
      name : '',
      image : '',
      description : '',
    }
  ]);

  // "질문-답변 세트"의 집합 -- (배열)
  const [questionSets, setQuestionSets] = useState<Array<TQuestionSet>>([
    {
      question: "",
      options: [
        {
          name: "",
          results: [],
        }, {
          name: "",
          results: [],
        },
      ],
    },
  ]);
  
  // generalInfo 상태 변경 메소드
  function onGeneralInfoChange(e:React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setGeneralInfo({
      ...generalInfo,
      [name] : value,
    });
  }

  // --------------------------------------------------------------------------
  // types 상태 변경 메소드 ----------------------------------------------------
  // --------------------------------------------------------------------------
  function onTypeChange(e:React.ChangeEvent<HTMLInputElement>) {
    if(!e.target.dataset.idx){
      console.error('"e.target.dataset.idx" is not valid : ' + e.target.dataset.idx);
      return; 
    }
    
    const { value, name } = e.target;
    let idx:number = parseInt(e.target.dataset.idx);
    
    setTypes([
      ...types.slice(0, idx),
      {
        ...types[idx],
        [name] : value,
      },
      ...types.slice(idx+1)
    ]);
  }

  function removeType(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if(!(e.target instanceof HTMLButtonElement))
      return;
    
    if(!e.target.dataset.idx){
      console.error('"e.target.dataset.idx" is not valid : ' + e.target.dataset.idx);
      return; 
    }

    let idx:number = parseInt(e.target.dataset.idx);
    setTypes([
      ...types.slice(0, idx),
      ...types.slice(idx+1)
    ]);

    //update questionSets. ... .results
    setQuestionSets(
      questionSets.map(questionSet => ({
        ...questionSet,
        "options" : questionSet.options.map(option => ({
          ...option,
          "results" : option.results.map(result => {
            if(result<idx) {
              return result;
            }
            else if(result===idx) {
              return -1;
            }
            else {
              return result-1;
            }
          }).filter(el => el !== -1)
        }))
      }))
    )
  }

  function addType(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setTypes([
      ...types,
      {
        name : '',
        image : '',
        description : '',
      }
    ]);
  }

  // --------------------------------------------------------------------------
  // questionSets 상태 변경 메소드 ---------------------------------------------
  // --------------------------------------------------------------------------
  function onQuestionChange(e:React.ChangeEvent<HTMLInputElement>) {
    if(!e.target.dataset.qidx){
      console.error('"e.target.dataset.qidx" is not valid : ' + e.target.dataset.qidx);
      return; 
    }

    const { value } = e.target;
    let qidx:number = 0;

    setQuestionSets([
      ...questionSets.slice(0, qidx),
      { ...questionSets[qidx], "question" : value, },
      ...questionSets.slice(qidx+1)
    ]);
  }

  function onOptionNameChange(e:React.ChangeEvent<HTMLInputElement>) {
    if(!e.target.dataset.qidx || !e.target.dataset.oidx){
      console.error(`"e.target.dataset" is not valid \n  qidx : ${e.target.dataset.qidx}\n  oidx : ${e.target.dataset.oidx}`);
      return; 
    }

    const {name, value} = e.target;
    const qidx:number = parseInt(e.target.dataset.qidx);
    const oidx:number = parseInt(e.target.dataset.oidx);

    const q:TQuestionSet = questionSets[qidx];
    setQuestionSets([
      ...questionSets.slice(0, qidx),
      {
        ...q,
        "options" : [
          ...q.options.slice(0, oidx), 
          { ...q.options[oidx], "name" : value },
          ...q.options.slice(oidx+1)      
        ]
      },
      ...questionSets.slice(qidx+1)
    ])
  }

  function onOptionResultChange(e:any) {
    if(!e.target.dataset.qidx || !e.target.dataset.oidx){
      console.error(`"e.target.dataset" is not valid \n  qidx : ${e.target.dataset.qidx}\n  oidx : ${e.target.dataset.oidx}`);
      return; 
    }

    if(!e.target.value){
      console.error('"e.target.value" is not valid : ' + e.target.value);
      return;
    }

    const {value, checked} = e.target;
    const typeIdx = parseInt(value);
    const qidx:number = parseInt(e.target.dataset.qidx);
    const oidx:number = parseInt(e.target.dataset.oidx);


    let modified:Array<number> = [...questionSets[qidx].options[oidx].results]
    if(checked){
      modified.push(typeIdx);
    } else {
      modified = modified.filter( el => el !== typeIdx);
    }

    const q:TQuestionSet = questionSets[qidx];
    setQuestionSets([
      ...questionSets.slice(0, qidx),
      {
        ...q,
        "options" : [
          ...q.options.slice(0, oidx), 
          { ...q.options[oidx], "results" : [...modified] },
          ...q.options.slice(oidx+1)      
        ]
      },
      ...questionSets.slice(qidx+1)
    ])
  }

  function addQuestionSet(e:any) {
    setQuestionSets([
      ...questionSets,
      {
        question: "",
        options: [
          {
            name: "",
            results: [],
          }, {
            name: "",
            results: [],
          },
        ],
      },
    ]);
  }

  function removeQuestionSet(e:any) {
    if(!(e.target instanceof HTMLButtonElement))
      return;
    if(!e.target.dataset.qidx){
      console.error('"e.target.dataset.idx" is not valid : ' + e.target.dataset.qidx);
      return; 
    }

    const qidx:number = parseInt(e.target.dataset.qidx);

    setQuestionSets([
      ...questionSets.slice(0, qidx),
      ...questionSets.slice(qidx+1)
    ]);
  }

  function addOption(e:any) {
    if(!(e.target instanceof HTMLButtonElement))
      return;
    if(!e.target.dataset.qidx){
      console.error('"e.target.dataset.idx" is not valid : ' + e.target.dataset.qidx);
      return; 
    }

    const qidx:number = parseInt(e.target.dataset.qidx);
    const q:TQuestionSet = questionSets[qidx];
    setQuestionSets([
      ...questionSets.slice(0, qidx),
      {
        ...q,
        "options" : [ ...q.options, { name: "", results: [], } ]
      },
      ...questionSets.slice(qidx+1)
    ])
  }

  function removeOption(e:any) {
    if(!(e.target instanceof HTMLButtonElement))
      return;
    if(!e.target.dataset.qidx || !e.target.dataset.oidx){
      console.error(`"e.target.dataset" is not valid \n  qidx : ${e.target.dataset.qidx}\n  oidx : ${e.target.dataset.oidx}`);
      return; 
    }

    const qidx:number = parseInt(e.target.dataset.qidx);
    const oidx:number = parseInt(e.target.dataset.oidx);
    const q:TQuestionSet = questionSets[qidx];
    setQuestionSets([
      ...questionSets.slice(0, qidx),
      {
        ...q,
        "options" : [ ...q.options.slice(0, oidx), ...q.options.slice(oidx+1) ]
      },
      ...questionSets.slice(qidx+1)
    ])
  }

  // --------------------------------------------------------------------------
  // firebase통신 함수 --------------------------------------------------------
  // --------------------------------------------------------------------------

  function submitNewDoc() { // 
    const formData:TFormData = {
      title: generalInfo.title,
      description: generalInfo.description,
      author: generalInfo.author,
      image: generalInfo.image,
      types: types,
      sets: questionSets,
    };

    // formData 최종 검증

    // storage에 이미지 업로드
    // formData의 모든 image property를 storage-downloadUrl로 대체
    
    // firestore에 formData기록
    alert('최종 내용 콘솔에 표시됨');
    console.log(formData);
  }

  return (
    <div className="Creator">
      <div>
        <span>제목 </span>
        <input type="text" name="title" placeholder="테스트 제목" onChange={onGeneralInfoChange} />
      </div>
      <div>
        <span>설명 </span>
        <input type="text" name="description" placeholder="테스트 설명" onChange={onGeneralInfoChange} />
      </div>
      <div>
        <span>이미지 </span>
        <input type="file" name="image" accept="image/*" onChange={onGeneralInfoChange} />
      </div>
      
      <br /> {/* 스타일 적용 전 임시 개행 */}
      <br /> {/* 스타일 적용 전 임시 개행 */}

      <div>
        <span>유형 정의</span>

        {types.map( (type, index) => (
          <div data-idx={index} key={index}>
            <div>
              <span>유형 이름 </span>
              <input type="text" name="name" placeholder="유형 이름" value={type.name} 
                onChange={onTypeChange} data-idx={index} />
            </div>
            <div>
              <span>유형 설명 </span>
              <input type="text" name="description" placeholder="유형 설명" value={type.description}
                onChange={onTypeChange} data-idx={index} />
            </div>
            <div>
              <span>유형 이미지 </span>
              <input type="file" name="image" accept="image/*" value={type.image}
                onChange={onTypeChange} data-idx={index} />
            </div>
            <div>
              <button onClick={removeType} data-idx={index}>위 유형 삭제</button>
            </div>

            <br /> {/* 스타일 적용 전 임시 개행 */}
          </div>
        ))}
        <div>
          <button onClick={addType}>새로운 유형 추가</button>
        </div>
      </div>

      <br /> {/* 스타일 적용 전 임시 개행 */}
      <br /> {/* 스타일 적용 전 임시 개행 */}

      <div>
        <span>질문-응답 세트</span>

        {questionSets.map( (questionSet, index) => {
          const qidx:number = index; // qidx : questionSet's index
          return (
            <div className="question-set-container" key={qidx}>
              <div>
                <span>질문 {qidx} </span>
                <input type="text" name="question" placeholder="질문 내용" value={questionSet.question}
                  onChange={onQuestionChange} data-qidx={qidx} />
              </div>

              {questionSet.options.map( (option, index) => {
                const oidx:number = index; // oidx : option's index
                return (
                  <div className="option-container" key={oidx} >
                    <div>
                      <span>질문 {qidx} - 응답 {oidx} </span>
                      <input type="text" name="option" placeholder="응답 내용" value={option.name} 
                        onChange={onOptionNameChange} data-qidx={qidx} data-oidx={oidx}
                      />
                    </div>

                    <div>
                    {types.map( (type, index) => (
                        <span key={index}>
                          <input type="checkbox" value={index}
                            onChange={onOptionResultChange} data-qidx={qidx} data-oidx={oidx}/>
                          <span>{type.name}</span>
                        </span>
                    ))}
                    </div>
                    
                    <button onClick={removeOption} data-qidx={qidx} data-oidx={oidx}>위 응답 제거</button>
                  </div>
                )}
              )}
              
              <div>
                <button onClick={addOption} data-qidx={qidx}>새로운 응답 추가</button>
              </div>

              <br /> {/* 스타일 적용 전 임시 개행 */}

              <div>  
                <button onClick={removeQuestionSet} data-qidx={qidx}>위 질문-응답 세트 삭제</button>
              </div>
              
              <br /> {/* 스타일 적용 전 임시 개행 */}
            </div>
          )} 
        )}
        <div>
          <button onClick={addQuestionSet}>새로운 질문-응답 세트 추가</button>
        </div>
      </div>

      <br /> {/* 스타일 적용 전 임시 개행 */}

      <button onClick={submitNewDoc}>만들기</button>
    </div>
  );
}

export default Creator;