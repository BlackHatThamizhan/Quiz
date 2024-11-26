import { type } from "@testing-library/user-event/dist/type";
import { fetchStudents, addStudent, editStudent ,getStudent , deleteStudent } from "../Services/api";

export const getStudents = () => async (dispatch) => {
  dispatch({ type: "FETCH_STUDENTS_REQUEST" });
  try {
    const students = await fetchStudents();
    dispatch({ type: "FETCH_STUDENTS_SUCCESS", payload: students });
  } catch (error) {
    dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
  }
};

export const fetchStudent = (studentId)=>async (dispatch)=>{
  dispatch({type:"FETCH_STUDENT_REQUEST"});
  try{
    const student = await getStudent(studentId);
    dispatch ({type:"FETCH_STUDENT_SUCCESS", payload: student})
  }catch(error){
    dispatch({type:"FETCH_STUDENT_FAILURE" , payload:error.message})
  }
}

export const addStudentAction = (studentDate) => async (dispatch) => {
  dispatch({type:"Add_STUDENT_REQUEST"});
  try{
    const addedStudent = await addStudent(studentDate);
    dispatch({type:"ADD_STUDENT_SUCCESS", payload: addedStudent});
  }
  catch (error){
    dispatch({type:"ADD_STUDENT_FAILURE", payload: error.message});
  }
}

export const editStudentAction = (studentData,studentId) => async (dispatch) =>{
  dispatch({type:"EDIT_STUDENT_REQUEST"});
  try{
    const editedStudent = await editStudent(studentId,studentData);
    dispatch({type:"EDIT_STUDENT_SUCCESS", payload:editedStudent});
    
  }catch(error){
    dispatch({type:"EDIT_STUDENT_FAILURE", payload: error.message});
  }
}

export const deleteStudentAction = (studentId) =>async (dispatch) =>{
  dispatch({type:"DELETE_STUDENT_REQUEST"});
  try{
    const deletedStudent = await deleteStudent(studentId);
    dispatch({type:"DELETE_STUDENT_SUCCESS", payload:deletedStudent});
    }catch(error){
      dispatch({type:"DELETE_STUDENT_FAILURE"});
    }
}